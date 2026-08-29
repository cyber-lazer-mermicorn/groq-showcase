# Groq Speed Showcase — Agent Doctrine

## What this repo is
Production-grade Groq integration showcase: ultra-low latency inference, LPU benchmarks, streaming, and tool use.
By Cherry Shanaley (Chan), AI Solutions Engineer.

## Tech stack
- **Framework:** Next.js 15 (App Router)
- **AI:** Groq SDK (latest), Vercel AI SDK adapter
- **Deployment:** Vercel Edge
- **Language:** TypeScript (strict)

## Coding rules
- TypeScript strict — no `any`
- Groq client is a singleton from `lib/groq.ts`
- All latency measurements use `performance.now()` — never `Date.now()` for benchmarks
- Streaming via Vercel AI SDK adapter — `createGroq` from `@ai-sdk/groq`
- Model IDs are constants in `lib/models.ts` — never hardcode strings in route handlers
- Benchmark results stored as structured JSON in `benchmarks/` — never prose

## Commands
```bash
npm install && npm run dev
npm run benchmark   # run latency benchmarks
npm run test
```

## Do not
- Hardcode Groq API keys
- Use `Date.now()` for latency measurement
- Hardcode model ID strings outside `lib/models.ts`
- Fake benchmark numbers
