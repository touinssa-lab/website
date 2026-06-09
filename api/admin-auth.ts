import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

// IP별 로그인 실패 이력 관리 (인메모리)
interface RateLimitInfo {
  attempts: number;
  lockUntil: number;
}
const rateLimitMap = new Map<string, RateLimitInfo>();

const LIMIT_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15분 잠금

// 토큰 생성 함수 (ADMIN_PASSWORD 기반 해시)
function generateAdminToken(password: string) {
  return crypto
    .createHmac('sha256', password)
    .update('admin_session_salt_2026')
    .digest('hex');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!correctPassword) {
    return res.status(500).json({ error: 'Admin password not configured on server' });
  }

  // GET: 토큰 검증
  if (req.method === 'GET') {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ valid: false, error: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    const expectedToken = generateAdminToken(correctPassword);

    if (token === expectedToken) {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(401).json({ valid: false, error: 'Invalid token' });
    }
  }

  // POST: 로그인 및 토큰 발급
  if (req.method === 'POST') {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    const limitInfo = rateLimitMap.get(ip) || { attempts: 0, lockUntil: 0 };

    if (limitInfo.lockUntil > now) {
      const remainingMin = Math.ceil((limitInfo.lockUntil - now) / 60000);
      return res.status(429).json({ 
        success: false, 
        error: `너무 많은 로그인 시도가 발생했습니다. ${remainingMin}분 후 다시 시도해 주세요.` 
      });
    }

    const { password } = req.body;

    if (password === correctPassword) {
      rateLimitMap.delete(ip);
      const token = generateAdminToken(correctPassword);
      return res.status(200).json({ success: true, token });
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

      return res.status(401).json({ success: false, error: errorMsg });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
