import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Mock API plugin for local development without Vercel CLI
const localApiMock = () => {
  return {
    name: 'local-api-mock',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/admin-auth' && req.method === 'POST') {
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
      proxy: {
        // Chat and other APIs still proxy to Vercel if needed, but we handle auth locally
        '/api/chat': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
      },
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
