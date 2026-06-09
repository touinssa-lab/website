import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. JWT 토큰 검증
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '인증 토큰이 누락되었습니다.' });
  }
  const token = authHeader.split(' ')[1];

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({ error: 'Server configuration missing (Supabase keys)' });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ error: '유효하지 않거나 만료된 세션입니다. 로그인 후 이용해주세요.' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing messages array' });
  }

  // Use the key from environment variables
  const rawKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || process.env.VITE_GOOGLE_GEMINI_API_KEY;
  const API_KEY = rawKey?.trim();

  if (!API_KEY) {
    return res.status(500).json({ error: 'Gemini API Key not configured on server' });
  }

  const systemMsg = messages.find(m => m.role === 'system');
  const chatMessages = messages.filter(m => m.role !== 'system');

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY
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
          maxOutputTokens: 8192,
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
