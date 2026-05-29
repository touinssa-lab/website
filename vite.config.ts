import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { spawn } from "child_process";

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

        if (urlPath === '/api/admin-auth' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const { password } = JSON.parse(body);
              // Fallback to default password for local dev if .env is not loaded
              const correctPassword = process.env.ADMIN_PASSWORD || 'twin32581';
              
              res.setHeader('Content-Type', 'application/json');
              if (password === correctPassword) {
                res.end(JSON.stringify({ success: true }));
              } else {
                res.statusCode = 401;
                res.end(JSON.stringify({ success: false, error: 'Invalid password' }));
              }
            } catch (e) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Server error parsing request' }));
            }
          });
          return;
        }

        if (urlPath === '/api/chat' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk.toString(); });
          req.on('end', async () => {
            try {
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
