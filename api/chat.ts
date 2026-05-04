import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing messages array' });
  }

  // Use the key from environment variables
  const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || process.env.VITE_GOOGLE_GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'Gemini API Key not configured on server' });
  }

  const systemMsg = messages.find(m => m.role === 'system');
  const chatMessages = messages.filter(m => m.role !== 'system');

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `SYSTEM INSTRUCTION: ${systemMsg?.content || "You are a helpful travel guide."}\n\nPlease follow the instruction above for all subsequent messages.` }]
          },
          {
            role: "model",
            parts: [{ text: "Understood. I will act as the travel guide with the persona you described." }]
          },
          ...chatMessages.map((m: any) => ({
            role: m.role === 'assistant' || m.role === 'bot' ? 'model' : 'user',
            parts: [{ text: m.content }]
          }))
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('Gemini API Error:', data.error);
      const errorMessage = typeof data.error === 'string' ? data.error : (data.error.message || JSON.stringify(data.error));
      return res.status(data.error.code || 500).json({ error: errorMessage });
    }

    if (!data.candidates || data.candidates.length === 0) {
      console.error('No candidates in response:', data);
      const reason = data.promptFeedback?.blockReason || 'Unknown Reason (Safety or Policy)';
      return res.status(500).json({ error: `답변을 생성하지 못했습니다. (사유: ${reason})` });
    }

    const botContent = data.candidates[0]?.content?.parts?.[0]?.text;
    if (!botContent) {
      return res.status(500).json({ error: "답변 내용이 비어있습니다." });
    }

    return res.status(200).json({
      role: 'bot',
      content: botContent
    });

  } catch (error: any) {
    console.error('Server Side Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
