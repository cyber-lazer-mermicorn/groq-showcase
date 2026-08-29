# Groq Inference Showcase

**What this proves:** Reproducible low-latency inference measurement using Groq's
API — throughput benchmarks, time-to-first-token, model comparison, and
latency-aware routing patterns. Numbers, not claims.

**Portfolio:** [cyber-lazer-mermicorn](https://github.com/cyber-lazer-mermicorn) · Cherry Shanaley

---

## Key patterns

| Pattern | What it proves |
|---|---|
| Latency measurement | TTFT and total latency per model, averaged over N runs |
| Throughput benchmarking | Tokens/sec across Llama, Mixtral, Gemma variants |
| Model routing | Route by latency budget — fast vs quality trade-off |
| Streaming | Chunk timing measurement, not just final output |
| Structured outputs | Typed JSON via Groq’s response format, Zod-validated |

## Run locally

```bash
npm install
cp .env.example .env   # add GROQ_API_KEY
npm run benchmark      # runs latency suite, prints table
npm run demo           # single-inference demo
npm test
```

## Evidence

- Benchmark output is a printed table: model | TTFT | tokens/sec | total
- Results are non-deterministic by nature; multiple runs are averaged
- Test suite asserts schema conformance and that latency values are positive numbers

## Honest scope

Showcase-grade: measurement patterns are correct. No production load balancing,
fallback routing, or cost tracking included.
