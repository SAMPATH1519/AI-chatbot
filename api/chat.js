// Serverless function (Vercel). The API key lives here, on the server,
// set via an environment variable — it is never sent to the browser.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing OPENROUTER_API_KEY' });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // OpenRouter uses the OpenAI-compatible chat format: role "system"/"user"/"assistant".
  const chatMessages = [
    { role: 'system', content: 'You are Sam AI, a helpful, friendly assistant. Always respond in English. Keep answers clear and concise.' },
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ];

  const model = 'openai/gpt-4o-mini'; // change to any model id from https://openrouter.ai/models

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        max_tokens: 1000,
        messages: chatMessages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || 'OpenRouter API error' });
    }

    const text = data?.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
    return res.status(200).json({ reply: text });
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
