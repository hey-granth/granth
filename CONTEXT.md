## ARCHITECTURE

A software project composed of the following subsystems:

- **src/**: Primary subsystem containing 34 files
- **cloudflare-worker/**: Primary subsystem containing 3 files
- **terminal/**: Primary subsystem containing 2 files
- **public/**: Primary subsystem containing 2 files
- **Root**: Contains scripts and execution points

## ENTRY_POINTS

### `src/components/sections/index.js`

```javascript
export { default as Hero } from './Hero';
export { default as ContentGrid } from './ContentGrid';
export { default as Projects } from './Projects';
export { default as Philosophy } from './Philosophy';
export { default as Experience } from './Experience';
export { default as Proof } from './Proof';
export { default as Contact } from './Contact';

```

## SYMBOL_INDEX

**`src/components/layout/Navbar.jsx`**
- `Navbar()`

**`src/components/sections/Hero.jsx`**
- `Hero()`

**`src/components/layout/Footer.jsx`**
- `Footer()`

**`src/components/sections/Projects.jsx`**
- `ProjectCard()`
- `Projects()`

**`src/components/sections/Contact.jsx`**
- `Contact()`

**`src/components/layout/Section.jsx`**
- `Section()`

**`src/lib/markdown.js`**
- `formatDate()`

**`terminal/main.go`**
- class `Section`
- `buildHeader()`
- `buildFooter()`
- `buildPanel()`
- `buildListItem()`
- `main()`

**`src/pages/Home.jsx`**
- `Home()`

**`src/pages/Blog.jsx`**
- `Blog()`

**`src/pages/BlogPost.jsx`**
- `BlogPost()`

**`src/components/sections/Experience.jsx`**
- `EraCard()`
- `Experience()`

**`src/components/sections/Proof.jsx`**
- `Proof()`

## IMPORTANT_CALL_PATHS

index()

index()

index()

index()

main.Section()
## CORE_MODULES

### `src/data/content.js`

**Purpose:** Implements content.

### `src/components/layout/Navbar.jsx`

**Purpose:** Implements Navbar.

**Functions:**
- `const Navbar = ...`

**Notes:** large file (347 lines)

### `src/components/sections/Hero.jsx`

**Purpose:** Implements Hero.

**Functions:**
- `const Hero = ...`

### `src/components/layout/Footer.jsx`

**Purpose:** Implements Footer.

**Functions:**
- `const Footer = ...`

### `src/components/BackgroundDepth.jsx`

**Purpose:** Implements BackgroundDepth.

### `src/lib/animations.js`

**Purpose:** Implements animations.

**Notes:** large file (348 lines)

## SUPPORTING_MODULES

### `src/components/layout/index.js`

*4 lines, 0 imports*

### `src/pages/index.js`

*4 lines, 0 imports*

### `src/components/sections/Projects.jsx`

```javascript
const ProjectCard = ...

const Projects = ...

```

### `src/components/sections/Contact.jsx`

```javascript
const Contact = ...

```

### `src/components/layout/Section.jsx`

```javascript
const Section = ...

```

### `src/lib/markdown.js`

```javascript
const formatDate = ...

```

### `terminal/main.go`

```go
Section struct

func buildHeader() string

func buildFooter() string

func buildPanel(title, content string, width int) string

func buildListItem(header, meta, body string, tags []string) string

func main()

```

### `src/pages/Home.jsx`

```javascript
const Home = ...

```

### `src/pages/Blog.jsx`

```javascript
const Blog = ...

```

### `src/pages/BlogPost.jsx`

```javascript
const BlogPost = ...

```

### `src/components/sections/Experience.jsx`

```javascript
const EraCard = ...

const Experience = ...

```

### `src/components/sections/Proof.jsx`

```javascript
const Proof = ...

```

### `src/components/ui/index.js`

*6 lines, 0 imports*

### `src/posts/codectx.md`

*477 lines, 0 imports*

## DEPENDENCY_GRAPH

```mermaid
graph LR
    f0["src/data/content.js"]
    f1["src/components/layout/Navbar.jsx"]
    f2["src/components/sections/Hero.jsx"]
    f3["src/components/layout/Footer.jsx"]
    f4["src/components/BackgroundDepth.jsx"]
    f5["src/lib/animations.js"]
    f6["src/components/sections/index.js"]
    f7["src/components/layout/index.js"]
    f8["src/pages/index.js"]
    f9["src/components/sections/Projects.jsx"]
    f10["src/components/sections/Contact.jsx"]
    f11["src/components/layout/Section.jsx"]
    f12["src/lib/markdown.js"]
    f13["terminal/main.go"]
    f14["src/pages/Home.jsx"]
    f15["src/pages/Blog.jsx"]
    f16["src/pages/BlogPost.jsx"]
    f17["src/components/sections/Experience.jsx"]
    f18["src/components/sections/Proof.jsx"]
    f19["src/components/ui/index.js"]
    f20["src/App.jsx"]
    f21["index.html"]
    f22["vercel.json"]
    f23["src/main.jsx"]
    f24["vite.config.js"]
    f1 --> f0
    f2 --> f0
    f3 --> f0
    f9 --> f0
    f10 --> f0
    f11 --> f5
    f14 --> f4
    f14 --> f6
    f14 --> f7
    f15 --> f5
    f15 --> f11
    f15 --> f4
    f15 --> f7
    f15 --> f12
    f16 --> f12
    f16 --> f11
    f16 --> f4
    f16 --> f7
    f17 --> f0
    f18 --> f0
    f20 --> f8
```

## RANKED_FILES

| File | Score | Tier | Tokens |
|------|-------|------|--------|
| `src/data/content.js` | 0.670 | structured summary | 13 |
| `src/components/layout/Navbar.jsx` | 0.403 | structured summary | 35 |
| `src/components/sections/Hero.jsx` | 0.314 | structured summary | 27 |
| `src/components/layout/Footer.jsx` | 0.270 | structured summary | 25 |
| `src/components/BackgroundDepth.jsx` | 0.259 | structured summary | 16 |
| `src/lib/animations.js` | 0.256 | structured summary | 22 |
| `src/components/sections/index.js` | 0.236 | full source | 88 |
| `src/components/layout/index.js` | 0.233 | signatures | 16 |
| `src/pages/index.js` | 0.189 | signatures | 15 |
| `src/components/sections/Projects.jsx` | 0.181 | signatures | 24 |
| `src/components/sections/Contact.jsx` | 0.181 | signatures | 19 |
| `src/components/layout/Section.jsx` | 0.167 | signatures | 18 |
| `src/lib/markdown.js` | 0.167 | signatures | 17 |
| `terminal/main.go` | 0.145 | signatures | 58 |
| `src/pages/Home.jsx` | 0.142 | signatures | 16 |
| `src/pages/Blog.jsx` | 0.139 | signatures | 17 |
| `src/pages/BlogPost.jsx` | 0.139 | signatures | 19 |
| `src/components/sections/Experience.jsx` | 0.136 | signatures | 24 |
| `src/components/sections/Proof.jsx` | 0.136 | signatures | 19 |
| `src/components/ui/index.js` | 0.100 | signatures | 16 |
| `src/posts/codectx.md` | 0.100 | signatures | 18 |
| `src/App.jsx` | 0.095 | one-liner | 19 |
| `index.html` | 0.092 | one-liner | 10 |
| `vercel.json` | 0.090 | one-liner | 11 |
| `src/main.jsx` | 0.089 | one-liner | 15 |
| `vite.config.js` | 0.089 | one-liner | 16 |
| `public/favicon.svg` | 0.048 | one-liner | 11 |
| `src/components/sections/ContentGrid.jsx` | 0.048 | one-liner | 24 |
| `src/components/sections/Philosophy.jsx` | 0.047 | one-liner | 25 |
| `terminal/go.mod` | 0.045 | one-liner | 11 |
| `.gitignore` | 0.045 | one-liner | 10 |
| `src/posts/hello-world.md` | 0.045 | one-liner | 14 |
| `README.md` | 0.044 | one-liner | 10 |
| `src/components/ui/AnimatedText.jsx` | 0.025 | one-liner | 23 |
| `src/components/ui/Card.jsx` | 0.025 | one-liner | 21 |
| `cloudflare-worker/README.md` | 0.001 | one-liner | 14 |
| `cloudflare-worker/worker.js` | 0.001 | one-liner | 18 |
| `cloudflare-worker/wrangler.toml` | 0.001 | one-liner | 16 |
| `src/posts/why-i-chose-monolith.md` | 0.000 | one-liner | 19 |
| `src/components/data/content.js` | 0.000 | one-liner | 13 |

## PERIPHERY

- `src/App.jsx` — 1 function, 3 imports, 18 lines
- `index.html` — 49 lines
- `vercel.json` — 4 lines
- `src/main.jsx` — 6 imports, 23 lines
- `vite.config.js` — 3 imports, 42 lines
- `public/favicon.svg` — 4 lines
- `src/components/sections/ContentGrid.jsx` — 1 function, 3 imports, 75 lines
- `src/components/sections/Philosophy.jsx` — 1 function, 3 imports, 80 lines
- `terminal/go.mod` — 21 lines
- `.gitignore` — 29 lines
- `src/posts/hello-world.md` — 95 lines
- `README.md` — 96 lines
- `src/components/ui/AnimatedText.jsx` — 1 function, 2 imports, 63 lines
- `src/components/ui/Card.jsx` — 1 function, 2 imports, 29 lines
- `cloudflare-worker/README.md` — 121 lines
- `cloudflare-worker/worker.js` — 2 functions, 77 lines
- `cloudflare-worker/wrangler.toml` — 12 lines
- `src/posts/why-i-chose-monolith.md` — 212 lines
- `src/components/data/content.js` — 10 lines
- `src/polyfills.js` — 1 imports, 21 lines
- `eslint.config.js` — 5 imports, 30 lines
- `postcss.config.js` — 6 lines
- `public/vite.svg` — 1 lines
- `src/App.css` — 43 lines
- `src/components/ui/Badge.jsx` — 1 function, 1 imports, 28 lines
- `src/components/ui/Button.jsx` — 2 imports, 49 lines
- `src/components/ui/GlowEffect.jsx` — 1 function, 1 imports, 44 lines

