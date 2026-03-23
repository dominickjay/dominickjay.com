#!/usr/bin/env node
/**
 * Test the Trakt "currently watching" function locally.
 * Run: netlify dev (in one terminal), then node scripts/generate-tv.mjs
 * Or against production: BASE_URL=https://dominickjay.com node scripts/generate-tv.mjs
 */
import "dotenv/config";

const base = process.env.BASE_URL || "http://localhost:8888";
const origin = base.startsWith("http") ? base : `http://${base}`;
const url = `${origin}/.netlify/functions/trakt-watching`;

console.log("GET", url);
const res = await fetch(url);
const raw = await res.text();
console.log("Status:", res.status, res.statusText);
let data;
try {
  data = raw.startsWith("{") ? JSON.parse(raw) : raw.slice(0, 200);
} catch {
  data = raw.slice(0, 200);
}
process.exit(res.ok ? 0 : 1);
