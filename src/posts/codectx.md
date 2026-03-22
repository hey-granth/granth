---
title: "I Built a Smarter Way to Feed Code to AI — Here's Everything About It"
date: "2026-03-22"
summary: "How I built an open-source CLI that feeds AI agents only the code that actually matters — using dependency graphs, AST parsing, and token budgeting instead of dumping entire repositories."
tags: ["architecture", "tool", "engineering", "tutorial"]
---

---

> **TL;DR:** AI coding agents waste the majority of their token budget just *finding* relevant code before they even start solving your problem. I built `codectx` — an open-source CLI tool that compiles repository context using dependency graph ranking, AST-driven summaries, and token budgeting so your agent gets exactly the right code, in the right order, at the right level of detail. This post covers the full story: the problem, how existing tools fall short, the architecture I designed, the implementation, and benchmark results.

---


## 1. The Problem Nobody Talks About

Imagine you're a new intern at a company. It's your first day. Your manager walks up and drops a box of 3,000 printed files on your desk — the entire codebase — and says: *"Fix the authentication bug."*

You don't read all 3,000 files. You can't. You look for the most relevant ones: the auth module, the session manager, maybe the config file. You work from the structure, not the mass.

AI coding agents face this exact problem — except nobody gave them the table of contents.

When you ask Claude Code, Cursor, or any AI agent to work on your codebase, it typically does one of two things:

- **Dumps everything** into its context window until it hits the token limit, paying for thousands of irrelevant tokens.
- **Reads files one by one**, spending most of its budget on orientation before it can even start solving.

One developer building a similar tool documented watching Claude Code read **25 files just to answer a question about 3 functions**. The answer needed ~800 tokens. The file-reading cost ~12,000. That's 93% waste on navigation alone.

This isn't a flaw in the AI. It's a flaw in how we're feeding it context.

---

## 2. How Context Actually Works in an LLM 

Before jumping into solutions, let's make sure we're on the same page about what a *context window* actually is and why it matters.

### Tokens — The Unit of Everything

LLMs don't read text the way humans do. They read *tokens* — chunks of text that are somewhere between a character and a word. Roughly speaking:

- 1 word ≈ 1.3 tokens in English text
- 1 line of Python ≈ 18 tokens
- A 50-line function ≈ 900 tokens

Every message you send, every file you attach, every line of code — it all converts to tokens. The model can only "see" whatever fits within its **context window**.

### What a Context Window Is

Think of the context window as the model's working memory. Claude has 200K tokens (1M via API). GPT-4 has 128K. These sound massive until you realize:

- The Google Cloud python-docs-samples repo alone is **56 million tokens** when packed naively with Repomix.
- Even a mid-sized Django project with 200 files can easily hit 80K–150K tokens.

So even with a 1M token window, you can't fit a real production codebase. You have to choose what goes in.

### Why More Tokens ≠ Better Results

Here's the part that surprises people: **dumping more code into the context window doesn't just cost more — it makes the model worse.**

Research on what's called the **"lost in the middle"** problem shows that LLMs don't pay equal attention to everything in their context. Information in the middle of a very long context gets systematically ignored. The model pays most attention to the beginning and end.

So if you jam 200K tokens of code into the context, the model may technically "see" the relevant function — but with all that noise surrounding it, its ability to reason about it degrades. You're paying more for worse results.

The right mental model: **context is a scarce resource, like CPU time or RAM.** You budget it. You allocate it deliberately. You don't just throw everything at it and hope.

---

## 3. What Existing Tools Do (And Where They Fail)

A bunch of tools have tried to solve this. Let's look at the main ones honestly.

### Repomix

Repomix packs your entire repository into a single XML or Markdown file for AI consumption. It's well-built, widely used, and genuinely useful for small codebases.

**What it does well:**
- Respects `.gitignore`
- Has a `--compress` option using Tree-sitter to reduce token count
- Counts tokens per file

**Where it falls short:**
- It packs *everything* by default. No ranking, no prioritization.
- The compressed output still treats all files equally — a utility helper gets the same weight as your core business logic module.
- No concept of token budget. You set a limit after the fact; it doesn't build context *toward* a budget.
- File order in the output is essentially alphabetical or directory-order, not relevance-order.

### GitIngest

GitIngest is similar to Repomix — converts a GitHub URL into a single text file suitable for LLM input.

**Limitation:** Same fundamental issue. It's a flat dump. The entire repo, linearized. No intelligence about what matters more.

### Aider's Repo Map

Aider (a terminal-based AI coding tool) has a smarter approach. It builds a "repo map" — a compact summary of the codebase's structure — using ctags to list symbols, classes, and functions.

**What it does well:** Much more compact than a full dump. Shows structure without showing full content.

**Where it falls short:** The repo map shows *what exists*, not *what matters most* for a given context. It doesn't use dependency relationships to prioritize. It's also tightly coupled to Aider's workflow, not usable as a standalone context compiler.

### Vector Embedding / RAG Approaches (Cursor, Cody, Greptile)

These tools embed your codebase into a vector database. When you ask a question, they retrieve the most *semantically similar* chunks.

**What it does well:** Great at finding code that *sounds like* what you're asking about.

**The fundamental blind spot:** Vector similarity captures semantic resemblance, not structural relationships. If you ask "how does authentication work?", a vector search retrieves all files that mention "auth", "login", "token". What it misses is that `middleware.ts` calls `refresh.ts` which depends on `jwt-config.ts`. The *call chain* — the actual architecture — is invisible to embeddings because they capture similarity, not structure.

Code is not a bag of words. Code is a graph.

### The Common Thread

Every existing tool has at least one of these problems:

1. **Flat ordering** — all files treated equally regardless of their importance to the codebase architecture
2. **No token budget awareness** — context is assembled first, trimmed after
3. **No structural understanding** — dependency relationships ignored
4. **Binary inclusion** — a file is either fully included or fully excluded, with no middle ground

---

## 4. My Approach: Graph-Ranked, Budget-Driven Context {#my-approach}

The core insight behind `codectx`:

> **Code files are not equally important. Their importance is determined by how many other things depend on them. And the model should see important things first, at full detail — and less important things at lower detail, if at all — within a fixed token budget.**

This gives us three design principles:

### Principle 1: Use the Dependency Graph for Ranking

If `database.py` is imported by 40 other modules, it's more architecturally central than `utils/string_helpers.py` which is imported by 2. This isn't an opinion — it's a measurable fact about the structure of the codebase.

`codectx` builds a full dependency graph of the repository using AST (Abstract Syntax Tree) parsing, then runs a **graph centrality algorithm** (PageRank-style) to score every file by its structural importance. Files that many things depend on rank higher.

### Principle 2: Tier-Compress Based on Rank

Not every file needs to be shown at full content. `codectx` uses three tiers:

- **Tier 1 (high rank):** Full source content included
- **Tier 2 (medium rank):** AST-driven structural summary — function signatures, class definitions, docstrings. No implementation bodies.
- **Tier 3 (low rank):** One-line descriptor only

The tier thresholds are **percentile-based**, not hardcoded. Top 20% of files by rank get Tier 1, next 30% get Tier 2, rest get Tier 3 (or are excluded entirely if the budget is tight).

### Principle 3: Build Toward a Token Budget

The token budget is the first-class constraint. `codectx` doesn't assemble a context and then trim it. It assembles the context *iteratively*, highest-ranked files first, stopping when the budget is consumed. Every file that gets included earns its place by rank.

The output also includes a `RANKED_FILES` section — a sorted list of all files with their scores — so the AI agent immediately knows which files are most architecturally significant, before reading a single line of code.

---

## 5. The Architecture of codectx {#architecture}

Here's how the pipeline works end-to-end:

```
Repository
    │
    ▼
[1] File Discovery
    │  Walks the repo, respects .gitignore, filters by extension
    │
    ▼
[2] AST Parsing (tree-sitter)
    │  Parses each file into an AST
    │  Extracts: imports, function defs, class defs, docstrings
    │
    ▼
[3] Dependency Graph Construction (rustworkx)
    │  Nodes = files
    │  Edges = import relationships
    │  Directed: A → B means "A imports B"
    │
    ▼
[4] Graph Ranking
    │  PageRank on the dependency graph
    │  Score = how many things depend on you (in-degree weighted)
    │
    ▼
[5] Tier Assignment (percentile-based thresholds)
    │  Top 20% → Tier 1 (full content)
    │  Next 30% → Tier 2 (AST summary)
    │  Bottom 50% → Tier 3 (descriptor only)
    │
    ▼
[6] Budget-Driven Inclusion
    │  Iterate files highest-rank-first
    │  Include each at its tier's token cost
    │  Stop when token budget is consumed
    │
    ▼
[7] Output Assembly
       RANKED_FILES section
       + included file contents (tiered)
       → Single text file ready for AI consumption
```

### Tech Stack

| Component | Tool | Why |
|---|---|---|
| AST parsing | `tree-sitter` | Fast, language-agnostic, C library |
| Graph construction + ranking | `rustworkx` | Rust-backed, ~10x faster than NetworkX |
| Git integration | `pygit2` | C/libgit2, respects git ignore properly |
| CLI | `typer` + `rich` | Ergonomic CLI, pretty terminal output |
| Package management | `uv` + `hatchling` | Modern Python tooling |

The native extension choices (`tree-sitter`, `rustworkx`, `pygit2`) are deliberate. All three are Python bindings to C/Rust cores. The hot paths — AST traversal, graph algorithms, file walking — happen in native code, not the Python interpreter.

---

## 6. How I Built It: The Technical Deep Dive

### Step 1: File Discovery

```python
def discover_files(repo_path: Path, extensions: list[str]) -> list[Path]:
    repo = pygit2.Repository(str(repo_path))
    # Respects .gitignore natively via libgit2
    ...
```

Using `pygit2` here rather than `os.walk` is important. `os.walk` doesn't know about `.gitignore`. `pygit2` uses libgit2's ignore rules, which means the same files git ignores, `codectx` ignores. No manually tracking ignore patterns.

### Step 2: AST Parsing with tree-sitter

tree-sitter parses source files into a concrete syntax tree. For each file, we extract:

```python
# Simplified structure of what we extract per file
{
    "imports": ["os", "pathlib.Path", "rustworkx"],
    "functions": [
        {"name": "rank_files", "signature": "def rank_files(graph: DiGraph) -> dict", "docstring": "..."},
    ],
    "classes": [...],
}
```

This extraction serves two purposes:
1. Building the dependency graph (imports → edges)
2. Generating Tier 2 summaries (signatures + docstrings, no bodies)

The Tier 2 summary for a 200-line file might be 15–20 lines. That's an 85–90% token reduction for medium-importance files while preserving all structural information the AI needs to understand what the file does and how to call into it.

### Step 3: Building the Dependency Graph

```python
import rustworkx as rx

graph = rx.PyDiGraph()
node_map = {}  # file_path -> node_index

for file in files:
    idx = graph.add_node(file)
    node_map[file] = idx

for file, parsed in parsed_files.items():
    for imported_module in parsed["imports"]:
        resolved = resolve_import(imported_module, file, repo_root)
        if resolved and resolved in node_map:
            graph.add_edge(node_map[file], node_map[resolved], None)
            # file → resolved means "file imports resolved"
            # so resolved has higher in-degree = more important
```

The edge direction matters: `A → B` means A imports B, so B has higher in-degree. Higher in-degree = more things depend on this file = more important.

### Step 4: PageRank Scoring

```python
scores = rx.pagerank(graph, alpha=0.85)
# scores[node_index] = importance score, 0 to 1
```

`rustworkx.pagerank` runs the algorithm in Rust. On a 500-file repo, this completes in under 10ms.

PageRank here is borrowed from web link analysis. In web search, a page is important if many other important pages link to it. In a codebase, a file is important if many other important files import it. Same mathematics, different domain.

### Step 5: Percentile-Based Tier Assignment

A key design decision: tier thresholds are *percentile-based*, not score-based. Why does this matter?

Score-based thresholds (`> 0.05 → Tier 1`) break across repos. A score of 0.05 might be top 5% in a large monorepo but top 50% in a small package. Percentile-based thresholds are always calibrated to the actual distribution of the specific repo being processed.

```python
import numpy as np

scores_array = np.array(list(scores.values()))
tier1_threshold = np.percentile(scores_array, 80)  # top 20%
tier2_threshold = np.percentile(scores_array, 50)  # next 30%

for file, score in scores.items():
    if score >= tier1_threshold:
        tier_map[file] = 1
    elif score >= tier2_threshold:
        tier_map[file] = 2
    else:
        tier_map[file] = 3
```

### Step 6: Budget-Driven Inclusion

```python
def build_context(files_ranked, tier_map, content_map, summaries_map, token_budget):
    used_tokens = 0
    output_sections = []

    for file in files_ranked:  # already sorted by score descending
        tier = tier_map[file]

        if tier == 1:
            content = content_map[file]
        elif tier == 2:
            content = summaries_map[file]  # AST-generated summary
        else:
            content = f"# {file}: {one_line_descriptor(file)}"

        cost = estimate_tokens(content)

        if used_tokens + cost > token_budget:
            break  # budget exhausted, stop including

        output_sections.append((file, content))
        used_tokens += cost

    return output_sections, used_tokens
```

The budget is a hard constraint that the entire assembly process is designed around, not an afterthought.

### Step 7: The RANKED_FILES Section

Every output starts with this section:

```
=== RANKED_FILES ===
1. src/core/engine.py          [score: 0.842] [tier: 1]
2. src/models/base.py          [score: 0.731] [tier: 1]
3. src/utils/graph.py          [score: 0.654] [tier: 1]
4. src/handlers/auth.py        [score: 0.421] [tier: 2]
...
```

This gives the AI agent an immediate architectural map of the codebase before it reads a single line of implementation code. It knows where to look if it needs to explore beyond the provided context.

---

## 7. Benchmark Results

I tested `codectx` against naive full-dump approaches on several real Python repositories, measuring token count at a fixed 32K token budget.

| Repository | Naive full dump | codectx output | Token reduction |
|---|---|---|---|
| `fastapi` (main) | ~210K tokens | 31.8K tokens | **84.8%** |
| `httpx` | ~95K tokens | 29.4K tokens | **69.1%** |
| `pydantic` (core) | ~180K tokens | 31.2K tokens | **82.7%** |
| `celery` | ~340K tokens | 30.9K tokens | **90.9%** |

In every case, `codectx` fits within the 32K budget while the naive dump exceeds the most common context window sizes by 2–10x.

**What's in the output at 32K tokens?**
- Full source for the top ~20% of files by architectural importance
- Structural summaries for the next ~30%
- Descriptors for the rest
- The `RANKED_FILES` index for the entire codebase

An AI agent given this output can immediately start solving problems. It doesn't need to explore. It doesn't need to read files to find the right files. The map is right there.

---

## 8. How to Use codectx

### Installation

```bash
pip install codectx
```

### Basic Usage

```bash
# Compile context for the current repo with a 32K token budget
codectx compile . --budget 32000

# Specify output file
codectx compile . --budget 32000 --output context.txt

# Use a different token budget (e.g., for Claude's 200K window)
codectx compile . --budget 180000

# Show ranked files without compiling full context
codectx rank .
```

### Feeding to an AI Agent

```bash
# Output to clipboard (pipe to pbcopy on macOS, xclip on Linux)
codectx compile . --budget 32000 | pbcopy

# Or save and reference in your prompt
codectx compile . --budget 32000 --output context.txt
# Then: "Here is the repository context: [paste contents of context.txt]"
```

### Example: Using with Claude Code

```bash
# Generate context and write to CLAUDE.md
codectx compile . --budget 40000 --output CLAUDE.md
# Claude Code picks up CLAUDE.md automatically
```

### Python API

```python
from codectx import compile_context

context = compile_context(
    repo_path=".",
    token_budget=32000,
    include_extensions=[".py", ".ts", ".go"],
)
print(context)
```

### Configuration (`.codectx.toml`)

```toml
[defaults]
budget = 32000
extensions = [".py", ".ts", ".js", ".go", ".rs"]
exclude_dirs = ["tests", "docs", "migrations"]

[tiers]
tier1_percentile = 80   # top 20% get full content
tier2_percentile = 50   # next 30% get summaries
```

---

## 9. What's Next

### v0.2 Planned Features

- **Query-aware ranking:** Right now ranking is purely structural (dependency graph). The next step is combining graph rank with query relevance. If you're asking about authentication, files with auth-related symbols should rank higher even if they have lower graph centrality.
- **Language support beyond Python:** tree-sitter supports 40+ languages. The current version is Python-focused. JavaScript/TypeScript and Go are next.
- **MCP server mode:** Expose `codectx` as an MCP server so AI agents can call it directly as a tool, rather than requiring a pre-generated context file.
- **Incremental updates:** Cache the graph between runs, only re-parse files that changed (via git diff).

### The Larger Idea

The tools we use to feed AI agents are going to matter enormously as agents become more capable and are asked to work on larger and more complex codebases. Bigger context windows are not the solution — they make the cost of bad context management higher, not lower.

The right direction is treating context as an engineered resource: ranked, budgeted, structured, and calibrated to what the agent actually needs to solve the task at hand.

`codectx` is an early attempt at that. It's open source, and the architecture is designed to be extended.

---

## Try It

```bash
pip install codectx
```

Source code and documentation:
- **GitHub:** [github.com/hey-granth/codectx](https://github.com/hey-granth/codectx)
- **Docs:** [codectx.granth.tech](https://codectx.granth.tech)
- **PyPI:** [pypi.org/project/codectx](https://pypi.org/project/codectx)

If you run into issues, find bugs, or want to contribute, open an issue or PR. The roadmap is public and contributions are welcome.
