## ARCHITECTURE

A software project composed of the following subsystems:

- **src/**: Primary subsystem containing 40 files
- **cloudflare-worker/**: Primary subsystem containing 3 files
- **terminal/**: Primary subsystem containing 2 files
- **public/**: Primary subsystem containing 2 files
- **Root**: Contains scripts and execution points

## ENTRY_POINTS

### `src/components/layout/index.js`

```javascript
export { default as Navbar } from './Navbar';
export { default as Section } from './Section';
export { default as Footer } from './Footer';

```

## SYMBOL_INDEX

**`src/components/layout/Navbar.jsx`**
- `Navbar()`

**`src/components/sections/Hero.jsx`**
- `Hero()`

**`src/components/ui/ExternalLinkPreview.jsx`**
- `getInitialMobileState()`
- `ExternalLinkPreview()`

**`src/components/layout/Footer.jsx`**
- `Footer()`

**`src/components/sections/Contact.jsx`**
- `Contact()`

**`src/components/sections/Projects.jsx`**
- `ProjectCard()`
- `Projects()`

**`src/lib/markdown.js`**
- `formatDate()`

**`src/components/sections/Proof.jsx`**
- `devicon()`
- `onIconError()`
- `Proof()`

**`src/pages/BlogPost.jsx`**
- `BlogPost()`

**`src/components/layout/Section.jsx`**
- `Section()`

**`terminal/main.go`**
- class `Section`
- `buildHeader()`
- `buildFooter()`
- `buildPanel()`
- `buildListItem()`
- `main()`

**`src/components/sections/Experience.jsx`**
- `EraCard()`
- `Experience()`

**`src/pages/Home.jsx`**
- `Home()`

**`src/pages/Blog.jsx`**
- `Blog()`

**`src/pages/ProjectsPage.jsx`**
- `ProjectsPage()`

## IMPORTANT_CALL_PATHS

index()
## CORE_MODULES

### `src/data/content.js`

**Purpose:** Implements content.

### `src/index.css`

**Purpose:** Implements index.

**Notes:** decorator-heavy (15 decorators); large file (1259 lines)

### `src/components/layout/Navbar.jsx`

**Purpose:** Implements Navbar.

**Functions:**
- `const Navbar = ...`

**Notes:** large file (351 lines)

### `src/components/sections/Hero.jsx`

**Purpose:** Implements Hero.

**Functions:**
- `const Hero = ...`

### `src/components/ui/ExternalLinkPreview.jsx`

**Purpose:** Implements ExternalLinkPreview.

**Functions:**
- `const ExternalLinkPreview = ...`
- `const getInitialMobileState = ...`

### `src/components/BackgroundDepth.jsx`

**Purpose:** Implements BackgroundDepth.

### `src/components/layout/Footer.jsx`

**Purpose:** Implements Footer.

**Functions:**
- `const Footer = ...`

## SUPPORTING_MODULES

### `src/components/sections/index.js`

*8 lines, 0 imports*

### `package.json`

*47 lines, 0 imports*

### `src/lib/animations.js`

*348 lines, 0 imports*

### `src/components/sections/Contact.jsx`

```javascript
const Contact = ...

```

### `src/components/sections/Projects.jsx`

```javascript
const ProjectCard = ...

const Projects = ...

```

### `src/lib/markdown.js`

```javascript
const formatDate = ...

```

### `src/pages/index.js`

*5 lines, 0 imports*

### `src/components/sections/Proof.jsx`

```javascript
const devicon = ...

const onIconError = ...

const Proof = ...

```

### `src/pages/BlogPost.jsx`

```javascript
const BlogPost = ...

```

### `src/components/layout/Section.jsx`

```javascript
const Section = ...

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

### `src/components/sections/Experience.jsx`

```javascript
const EraCard = ...

const Experience = ...

```

### `src/pages/Home.jsx`

```javascript
const Home = ...

```

### `src/pages/Blog.jsx`

```javascript
const Blog = ...

```

### `src/pages/ProjectsPage.jsx`

```javascript
const ProjectsPage = ...

```

### `vite.config.js`

*44 lines, 4 imports*

### `src/components/ui/index.js`

*6 lines, 0 imports*

## DEPENDENCY_GRAPH

```mermaid
graph LR
    f0["src/data/content.js"]
    f1["src/index.css"]
    f2["src/components/layout/Navbar.jsx"]
    f3["src/components/sections/Hero.jsx"]
    f4["src/components/ui/ExternalLinkPreview.jsx"]
    f5["src/components/BackgroundDepth.jsx"]
    f6["src/components/layout/Footer.jsx"]
    f7["src/components/layout/index.js"]
    f8["src/components/sections/index.js"]
    f9["package.json"]
    f10["src/lib/animations.js"]
    f11["src/components/sections/Contact.jsx"]
    f12["src/components/sections/Projects.jsx"]
    f13["src/lib/markdown.js"]
    f14["src/pages/index.js"]
    f15["src/components/sections/Proof.jsx"]
    f16["src/pages/BlogPost.jsx"]
    f17["src/components/layout/Section.jsx"]
    f18["terminal/main.go"]
    f19["src/components/sections/Experience.jsx"]
    f20["src/pages/Home.jsx"]
    f21["src/pages/Blog.jsx"]
    f22["src/pages/ProjectsPage.jsx"]
    f23["vite.config.js"]
    f24["src/components/ui/index.js"]
    f2 --> f0
    f3 --> f4
    f3 --> f0
    f6 --> f4
    f6 --> f0
    f11 --> f4
    f11 --> f0
    f12 --> f4
    f12 --> f0
    f15 --> f4
    f15 --> f0
    f16 --> f4
    f16 --> f13
    f16 --> f17
    f16 --> f5
    f16 --> f7
    f17 --> f10
    f19 --> f0
    f20 --> f5
    f20 --> f8
    f20 --> f7
    f21 --> f10
    f21 --> f17
    f21 --> f5
    f21 --> f7
    f21 --> f13
    f22 --> f5
    f22 --> f8
    f22 --> f7
```

## RANKED_FILES

| File | Score | Tier | Tokens |
|------|-------|------|--------|
| `src/data/content.js` | 0.714 | structured summary | 13 |
| `src/index.css` | 0.403 | structured summary | 28 |
| `src/components/layout/Navbar.jsx` | 0.382 | structured summary | 35 |
| `src/components/sections/Hero.jsx` | 0.356 | structured summary | 27 |
| `src/components/ui/ExternalLinkPreview.jsx` | 0.340 | structured summary | 42 |
| `src/components/BackgroundDepth.jsx` | 0.321 | structured summary | 16 |
| `src/components/layout/Footer.jsx` | 0.319 | structured summary | 25 |
| `src/components/layout/index.js` | 0.314 | full source | 43 |
| `src/components/sections/index.js` | 0.299 | signatures | 17 |
| `package.json` | 0.294 | signatures | 13 |
| `src/lib/animations.js` | 0.284 | signatures | 15 |
| `src/components/sections/Contact.jsx` | 0.246 | signatures | 19 |
| `src/components/sections/Projects.jsx` | 0.246 | signatures | 24 |
| `src/lib/markdown.js` | 0.235 | signatures | 17 |
| `src/pages/index.js` | 0.217 | signatures | 15 |
| `src/components/sections/Proof.jsx` | 0.210 | signatures | 30 |
| `src/pages/BlogPost.jsx` | 0.199 | signatures | 19 |
| `src/components/layout/Section.jsx` | 0.195 | signatures | 18 |
| `terminal/main.go` | 0.173 | signatures | 58 |
| `src/components/sections/Experience.jsx` | 0.163 | signatures | 24 |
| `src/pages/Home.jsx` | 0.160 | signatures | 16 |
| `src/pages/Blog.jsx` | 0.159 | signatures | 17 |
| `src/pages/ProjectsPage.jsx` | 0.150 | signatures | 19 |
| `vite.config.js` | 0.149 | signatures | 15 |
| `src/components/ui/index.js` | 0.136 | signatures | 16 |
| `src/App.jsx` | 0.123 | one-liner | 19 |
| `.gitignore` | 0.112 | one-liner | 10 |
| `index.html` | 0.110 | one-liner | 10 |
| `vercel.json` | 0.110 | one-liner | 11 |
| `src/main.jsx` | 0.109 | one-liner | 15 |
| `src/components/ui/link-preview.jsx` | 0.109 | one-liner | 22 |
| `src/components/ui/link-preview.tsx` | 0.109 | one-liner | 19 |
| `src/components/sections/ContentGrid.jsx` | 0.091 | one-liner | 24 |
| `src/components/sections/Philosophy.jsx` | 0.091 | one-liner | 25 |
| `public/favicon.svg` | 0.074 | one-liner | 11 |
| `terminal/go.mod` | 0.073 | one-liner | 11 |
| `src/posts/hello-world.md` | 0.073 | one-liner | 14 |
| `README.md` | 0.073 | one-liner | 10 |
| `src/components/ui/AnimatedText.jsx` | 0.061 | one-liner | 23 |
| `src/components/ui/Card.jsx` | 0.061 | one-liner | 21 |

## PERIPHERY

- `src/App.jsx` — 1 function, 3 imports, 19 lines
- `.gitignore` — 30 lines
- `index.html` — 49 lines
- `vercel.json` — 4 lines
- `src/main.jsx` — 6 imports, 23 lines
- `src/components/ui/link-preview.jsx` — 2 functions, 2 imports, 118 lines
- `src/components/ui/link-preview.tsx` — 5 imports, 152 lines
- `src/components/sections/ContentGrid.jsx` — 1 function, 3 imports, 75 lines
- `src/components/sections/Philosophy.jsx` — 1 function, 3 imports, 80 lines
- `public/favicon.svg` — 4 lines
- `terminal/go.mod` — 21 lines
- `src/posts/hello-world.md` — 95 lines
- `README.md` — 96 lines
- `src/components/ui/AnimatedText.jsx` — 1 function, 2 imports, 63 lines
- `src/components/ui/Card.jsx` — 1 function, 2 imports, 29 lines
- `components.json` — 28 lines
- `src/components/link-preview-demo.tsx` — 3 imports, 32 lines
- `tsconfig.json` — 10 lines
- `src/posts/codectx.md` — 477 lines
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

