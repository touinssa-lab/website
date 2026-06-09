import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { spawn } from "child_process";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const generateAdminToken = (password: string) => {
  return crypto
    .createHmac('sha256', password)
    .update('admin_session_salt_2026')
    .digest('hex');
};

interface RateLimitInfo {
  attempts: number;
  lockUntil: number;
}
const rateLimitMap = new Map<string, RateLimitInfo>();
const LIMIT_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15분 잠금

// Mock API plugin for local development without Vercel CLI
const localApiMock = () => {
  return {
    name: 'local-api-mock',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const urlPath = req.url ? req.url.split('?')[0] : '';

        if (urlPath === '/api/run-agent' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const { step } = JSON.parse(body);
              const pythonPath = "D:\\뉴프로젝트\\AutoAgent\\venv\\Scripts\\python.exe";
              const scriptPath = "D:\\뉴프로젝트\\AutoAgent\\newsroom_agent\\agent.py";
              
              const args = [scriptPath, "--force"];
              if (step && step !== 'all') {
                args.push('--only', step);
              }
              
              console.log(`[Local API] Triggering agent with cmd: ${pythonPath} ${args.join(' ')}`);
              
              const child = spawn(pythonPath, args, {
                detached: true,
                stdio: 'ignore'
              });
              child.unref();
              
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: `Successfully triggered agent step: ${step}` }));
            } catch (e: any) {
              console.error('[Local API] Error triggering agent:', e);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: e.message || 'Server error' }));
            }
          });
          return;
        }

        if (urlPath === '/api/admin-auth') {
          const correctPassword = process.env.ADMIN_PASSWORD;
          res.setHeader('Content-Type', 'application/json');

          if (!correctPassword) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: 'ADMIN_PASSWORD environment variable is not configured.' }));
            return;
          }

          if (req.method === 'GET') {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
              res.statusCode = 401;
              res.end(JSON.stringify({ valid: false, error: 'Authorization header missing' }));
              return;
            }
            const token = authHeader.split(' ')[1];
            const expectedToken = generateAdminToken(correctPassword);

            if (token === expectedToken) {
              res.end(JSON.stringify({ valid: true }));
            } else {
              res.statusCode = 401;
              res.end(JSON.stringify({ valid: false, error: 'Invalid token' }));
            }
            return;
          }

          if (req.method === 'POST') {
            const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
            const now = Date.now();
            const limitInfo = rateLimitMap.get(ip) || { attempts: 0, lockUntil: 0 };

            if (limitInfo.lockUntil > now) {
              const remainingMin = Math.ceil((limitInfo.lockUntil - now) / 60000);
              res.statusCode = 429;
              res.end(JSON.stringify({ 
                success: false, 
                error: `너무 많은 로그인 시도가 발생했습니다. ${remainingMin}분 후 다시 시도해 주세요.` 
              }));
              return;
            }

            let body = '';
            req.on('data', (chunk: any) => { body += chunk.toString(); });
            req.on('end', () => {
              try {
                const { password } = JSON.parse(body);
                if (password === correctPassword) {
                  rateLimitMap.delete(ip);
                  const token = generateAdminToken(correctPassword);
                  res.end(JSON.stringify({ success: true, token }));
                } else {
                  limitInfo.attempts += 1;
                  if (limitInfo.attempts >= LIMIT_ATTEMPTS) {
                    limitInfo.lockUntil = now + LOCK_TIME;
                  }
                  rateLimitMap.set(ip, limitInfo);

                  const remainingAttempts = LIMIT_ATTEMPTS - limitInfo.attempts;
                  const errorMsg = limitInfo.attempts >= LIMIT_ATTEMPTS
                    ? '로그인 시도 횟수를 초과하여 15분간 잠금 상태가 됩니다.'
                    : `비밀번호가 올바르지 않습니다. (남은 시도 횟수: ${remainingAttempts}회)`;

                  res.statusCode = 401;
                  res.end(JSON.stringify({ success: false, error: errorMsg }));
                }
              } catch (e) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Server error parsing request' }));
              }
            });
            return;
          }

          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        if (urlPath === '/api/chat' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk.toString(); });
          req.on('end', async () => {
            try {
              // 1. JWT 토큰 검증
              const authHeader = req.headers.authorization;
              if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: '인증 토큰이 누락되었습니다.' }));
              }
              const token = authHeader.split(' ')[1];

              const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
              const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

              if (!supabaseUrl || !supabaseAnonKey) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'Server configuration missing (Supabase keys)' }));
              }

              const supabase = createClient(supabaseUrl, supabaseAnonKey);
              const { data: { user }, error: authError } = await supabase.auth.getUser(token);

              if (authError || !user) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: '유효하지 않거나 만료된 세션입니다. 로그인 후 이용해주세요.' }));
              }

              const { messages } = JSON.parse(body);
              if (!messages || !Array.isArray(messages)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'Missing messages array' }));
              }

              const rawKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || process.env.VITE_GOOGLE_GEMINI_API_KEY;
              const API_KEY = rawKey?.trim();

              if (!API_KEY) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'Gemini API Key not configured on local server' }));
              }

              const systemMsg = messages.find((m: any) => m.role === 'system');
              const chatMessages = messages.filter((m: any) => m.role !== 'system');

              console.log('[Local API] Chatbot request received. Calling Gemini API...');
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

              const data: any = await response.json();
              
              if (data.error) {
                console.error('[Local API] Gemini API Error:', data.error);
                const errorMessage = typeof data.error === 'string' ? data.error : (data.error.message || JSON.stringify(data.error));
                res.statusCode = data.error.code || 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: errorMessage }));
              }

              if (!data.candidates || data.candidates.length === 0) {
                console.error('[Local API] No candidates in response:', data);
                const reason = data.promptFeedback?.blockReason || 'Unknown Reason (Safety or Policy)';
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: `답변을 생성하지 못했습니다. (사유: ${reason})` }));
              }

              const botContent = data.candidates[0]?.content?.parts?.[0]?.text;
              if (!botContent) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: "답변 내용이 비어있습니다." }));
              }

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                role: 'bot',
                content: botContent
              }));

            } catch (e: any) {
              console.error('[Local API] Error in local chat api:', e);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: e.message || 'Server error' }));
            }
          });
          return;
        }

        if (urlPath === '/api/analytics' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          const mockData = {
            activeUsers: Math.floor(Math.random() * 15) + 5,
            chartData: Array.from({ length: 30 }, (_, i) => {
              const d = new Date();
              d.setDate(d.getDate() - (29 - i));
              const dateStr = d.toISOString().split('T')[0].replace(/-/g, '');
              return {
                date: dateStr,
                count: Math.floor(Math.random() * 100) + 50
              };
            }),
            totals: {
              activeUsers: 2450,
              pageViews: 12840,
              sessions: 4120
            }
          };
          res.end(JSON.stringify(mockData));
          return;
        }

        next();
      });
    }
  };
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Load environment variables for the mock plugin
  process.env = { ...process.env, ...env };

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(), 
      localApiMock(),
      mode === "development" && componentTagger()
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
