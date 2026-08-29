# Architecture

## Overview
Groq Speed Showcase demonstrates ultra-low latency LLM inference using Groq LPUs, with real benchmark data and streaming patterns.

## Layers

| Layer | Path | Responsibility |
|---|---|---|
| Groq Client | `lib/groq.ts` | Singleton Groq client |
| Model Registry | `lib/models.ts` | All model ID constants |
| Benchmarks | `benchmarks/` | Structured JSON benchmark results |
| API Routes | `app/api/` | Streaming inference endpoints |
| Tests | `__tests__/` | Unit tests |

## Benchmark methodology
Latency = time from request send to first token received, measured with `performance.now()`. Results include model, input token count, TTFT (ms), and throughput (tokens/s).
