import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateTerminalPortfolio } from "./lib/terminal-content";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const output = generateTerminalPortfolio();

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).send(output);
}
