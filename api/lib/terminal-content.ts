// Terminal portfolio content — editable without touching routing logic
// ANSI escape codes for restrained styling

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";
const WHITE = "\x1b[37m";
const GRAY = "\x1b[90m";

const LINE_WIDTH = 80;
const DIVIDER = GRAY + "─".repeat(LINE_WIDTH) + RESET;

function section(title: string): string {
  return `\n${CYAN}${BOLD}${title}${RESET}\n${DIVIDER}`;
}

function label(text: string): string {
  return `${YELLOW}${text}${RESET}`;
}

function dim(text: string): string {
  return `${GRAY}${text}${RESET}`;
}

function bold(text: string): string {
  return `${WHITE}${BOLD}${text}${RESET}`;
}

export function generateTerminalPortfolio(): string {
  const lines: string[] = [];

  // Header
  lines.push("");
  lines.push(`${CYAN}${BOLD}Granth Agarwal${RESET}`);
  lines.push(`${WHITE}Backend Engineer${RESET} ${dim("·")} ${dim("Systems · APIs · Scale")}`);
  lines.push("");

  // Contact
  lines.push(section("CONTACT"));
  lines.push(`  ${label("Email")}     granthcodes@gmail.com`);
  lines.push(`  ${label("GitHub")}    github.com/hey-granth`);
  lines.push(`  ${label("LinkedIn")}  linkedin.com/in/granth-agarwal`);
  lines.push(`  ${label("Web")}       granth.dev`);

  // Stack
  lines.push(section("STACK"));
  lines.push(`  ${label("Languages")}   Python, SQL, JavaScript`);
  lines.push(`  ${label("Frameworks")}  Django, FastAPI, Celery`);
  lines.push(`  ${label("Databases")}   PostgreSQL, Redis, pgvector, PostGIS`);
  lines.push(`  ${label("Infra")}       Docker, Linux, GCP, Git`);

  // Experience
  lines.push(section("EXPERIENCE"));
  lines.push("");
  lines.push(`  ${bold("Backend Developer")} ${dim("·")} Freelance ${dim("(Oct 2025 – Present)")}`);
  lines.push(`  ${dim("Full ownership from architecture to deployment")}`);
  lines.push(`    • 40+ REST APIs with comprehensive documentation`);
  lines.push(`    • 230+ automated tests across multiple services`);
  lines.push(`    • PostGIS spatial queries for warehouse routing`);
  lines.push(`    • Redis + Celery async task workflows`);
  lines.push("");
  lines.push(`  ${bold("Python Developer")} ${dim("·")} EverythingAboutAI ${dim("(Jul – Aug 2025)")}`);
  lines.push(`  ${dim("FastAPI automation services and pipeline integrations")}`);
  lines.push(`    • FastAPI microservices for automation`);
  lines.push(`    • Make.com integration pipelines`);

  // Projects
  lines.push(section("PROJECTS"));
  lines.push("");
  lines.push(`  ${bold("TrustSystem")} ${dim("— Patent-backed identity verification")}`);
  lines.push(`    pgvector + Sentence Transformers for fraud detection`);
  lines.push(`    ${dim("Patent #202511094809 · Django, PostgreSQL, Redis")}`);
  lines.push("");
  lines.push(`  ${bold("StandardStitch")} ${dim("— Multi-tenant commerce platform")}`);
  lines.push(`    Enterprise backend with PostGIS spatial queries`);
  lines.push(`    ${dim("40+ APIs · Django, PostgreSQL, PostGIS, Celery")}`);
  lines.push("");
  lines.push(`  ${bold("MemeTrends")} ${dim("— Real-time analytics engine")}`);
  lines.push(`    Redis leaderboards with time-decay algorithms`);
  lines.push(`    ${dim("O(log N) operations · Django, Redis, Celery")}`);

  // Credentials
  lines.push(section("CREDENTIALS"));
  lines.push(`  ${label("Patent")}     Multi-Modal Identity Verification System`);
  lines.push(`              ${dim("#202511094809 · Published Nov 2025")}`);
  lines.push(`  ${label("Community")}  5000+ members · Elixir Tech Community Lead`);
  lines.push(`  ${label("Testing")}    230+ automated tests across projects`);

  // Footer
  lines.push("");
  lines.push(DIVIDER);
  lines.push(`${dim("Open to backend engineering roles · granthcodes@gmail.com")}`);
  lines.push("");

  return lines.join("\n");
}
