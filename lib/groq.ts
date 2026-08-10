import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Groq LPU — 500+ tokens/sec
export async function chatWithGroq(messages: any[], model = 'llama-4-maverick') {
  const response = await groq.chat.completions.create({
    model,
    messages,
    stream: true,
    // Groq performance settings
    max_tokens: 4096,
    temperature: 0.7,
  });

  return response;
}

// Batch processing — 1000 requests in parallel
export async function batchProcess(requests: any[]) {
  const batchSize = 100;
  const results = [];

  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(req => 
        groq.chat.completions.create({
          model: 'llama-4-maverick',
          messages: req.messages,
          max_tokens: 1024,
        })
      )
    );
    results.push(...batchResults);
  }

  return results;
}

// Model comparison — Compare speed across models
export async function compareModels(prompt: string) {
  const models = [
    'llama-4-maverick',
    'mixtral-8x22b-32768',
    'gemma2-9b-it',
    'deepseek-v3',
  ];

  const results = [];

  for (const model of models) {
    const start = Date.now();
    const response = await groq.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1024,
    });
    const end = Date.now();

    results.push({
      model,
      latency: end - start,
      tokens: response.usage?.total_tokens || 0,
      content: response.choices[0].message.content,
    });
  }

  return results.sort((a, b) => a.latency - b.latency);
}

// Streaming with Groq
export async function streamWithGroq(messages: any[]) {
  const stream = await groq.chat.completions.create({
    model: 'llama-4-maverick',
    messages,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      process.stdout.write(content);
    }
  }
}