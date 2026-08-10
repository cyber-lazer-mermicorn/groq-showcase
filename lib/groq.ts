import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function chatWithGroq(messages: any[], options?: {
  model?: string;
  maxTokens?: number;
  temperature?: number;
}) {
  try {
    const response = await groq.chat.completions.create({
      model: options?.model || 'llama-3.3-70b-versatile',
      messages,
      max_tokens: options?.maxTokens || 1024,
      temperature: options?.temperature || 0.7,
    });
    return response.choices[0].message.content;
  } catch (error: any) {
    throw new Error(`Groq chat error: ${error?.status || 500} - ${error?.message || 'Unknown error'}`);
  }
}

export async function streamChat(messages: any[]) {
  try {
    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      stream: true,
    });
    return stream;
  } catch (error: any) {
    throw new Error(`Stream error: ${error?.status || 500} - ${error?.message || 'Unknown error'}`);
  }
}

export async function speedTest(prompt: string, iterations = 5) {
  try {
    const results: number[] = [];
    for (let i = 0; i < iterations; i++) {
      const start = Date.now();
      await chatWithGroq([{ role: 'user', content: prompt }]);
      results.push(Date.now() - start);
    }
    const avg = results.reduce((a, b) => a + b, 0) / results.length;
    return { results, average: avg, min: Math.min(...results), max: Math.max(...results), iterations };
  } catch (error: any) {
    throw new Error(`Speed test error: ${error?.message || 'Unknown error'}`);
  }
}

export async function compareModels(prompt: string, models: string[]) {
  try {
    const results = await Promise.all(
      models.map(async (model) => {
        const start = Date.now();
        const response = await chatWithGroq([{ role: 'user', content: prompt }], { model });
        return { model, latency: Date.now() - start, response };
      })
    );
    return results.sort((a, b) => a.latency - b.latency);
  } catch (error: any) {
    throw new Error(`Model comparison error: ${error?.message || 'Unknown error'}`);
  }
}

export async function batchInference(prompts: string[], concurrency = 10) {
  try {
    const chunks: string[][] = [];
    for (let i = 0; i < prompts.length; i += concurrency) {
      chunks.push(prompts.slice(i, i + concurrency));
    }
    const results: any[] = [];
    for (const chunk of chunks) {
      const chunkResults = await Promise.all(
        chunk.map(async (prompt) => {
          const result = await chatWithGroq([{ role: 'user', content: prompt }]);
          return { prompt, result };
        })
      );
      results.push(...chunkResults);
    }
    return results;
  } catch (error: any) {
    throw new Error(`Batch inference error: ${error?.message || 'Unknown error'}`);
  }
}

export function calculateCost(inputTokens: number, outputTokens: number) {
  const inputCost = (inputTokens / 1_000_000) * 0.59;
  const outputCost = (outputTokens / 1_000_000) * 0.79;
  return { inputCost, outputCost, totalCost: inputCost + outputCost, model: 'llama-3.3-70b-versatile' };
}
