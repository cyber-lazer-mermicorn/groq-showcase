# GitHub Copilot Instructions — Groq Speed Showcase

You are working on a Groq LPU inference showcase by Cherry Shanaley.

## Always
- Use `createGroq` from `@ai-sdk/groq` for streaming
- Import model IDs from `lib/models.ts`
- Measure latency with `performance.now()` — start before request, end at first token
- Store benchmark results as typed JSON objects

## Never
- Hardcode model strings like `'llama-3.1-70b-versatile'` in route handlers
- Use `Date.now()` for sub-millisecond timing
- Fabricate benchmark results

## Pattern: streaming with Groq
```typescript
import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { MODELS } from '@/lib/models';
const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
export async function POST(req: Request) {
  const { prompt } = await req.json();
  const result = streamText({ model: groq(MODELS.LLAMA_70B), prompt });
  return result.toDataStreamResponse();
}
```
