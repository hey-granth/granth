# Cloudflare Worker — Terminal Portfolio Proxy

This Cloudflare Worker acts as an edge proxy for `granth.tech`, routing requests based on User-Agent:

- **CLI tools** (curl, wget, httpie) → Terminal portfolio with ANSI styling
- **Browsers** → Vercel-hosted React app

## Architecture

```
┌─────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│   Client    │────▶│  Cloudflare Worker  │────▶│  Vercel (React) │
│ curl/browser│     │   (User-Agent check)│     │  granth.vercel  │
└─────────────┘     └─────────────────────┘     └─────────────────┘
                            │
                            ▼ (if CLI)
                    ┌───────────────┐
                    │ Terminal      │
                    │ Portfolio     │
                    │ (ANSI output) │
                    └───────────────┘
```

## Prerequisites

1. Cloudflare account with `granth.tech` domain
2. Node.js 18+
3. Wrangler CLI

## Setup

```bash
# Install Wrangler
npm install -g wrangler

# Authenticate with Cloudflare
wrangler login

# Navigate to this directory
cd cloudflare-worker
```

## Configuration

Edit `wrangler.toml` if needed:

```toml
name = "granth-portfolio-proxy"
main = "worker.js"
compatibility_date = "2024-01-01"

routes = [
  { pattern = "granth.tech/*", zone_name = "granth.tech" }
]
```

## Deployment

```bash
# Deploy to production
wrangler deploy

# Or use npx if not globally installed
npx wrangler deploy
```

## Testing

After deployment:

```bash
# Terminal portfolio (CLI)
curl https://granth.tech

# Should show ANSI-styled output with colors

# Browser behavior (unchanged)
# Visit https://granth.tech in any browser
```

## Updating Terminal Content

1. Rebuild the Go program:
   ```bash
   cd ../terminal
   go build -o terminal-portfolio .
   ./terminal-portfolio > terminal.txt
   ```

2. Re-encode the output:
   ```bash
   cat terminal.txt | base64 -w0
   ```

3. Update `TERMINAL_OUTPUT_B64` in `worker.js`

4. Redeploy:
   ```bash
   wrangler deploy
   ```

## DNS Configuration

Ensure your Cloudflare DNS has:

- **A record** or **CNAME** pointing to Vercel (for fallback)
- **Proxy status**: Proxied (orange cloud) — required for Worker to intercept

## Files

| File | Purpose |
|------|---------|
| `worker.js` | Cloudflare Worker source |
| `wrangler.toml` | Wrangler configuration |
| `README.md` | This file |

## Notes

- The terminal output is base64-encoded to preserve ANSI escape sequences
- Worker runs at the edge — minimal latency for CLI detection
- No Vercel serverless functions needed — pure static deployment