import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.VITE_SUPABASE_ANON_KEY as string
);

async function check() {
  const { data: kw, error: err1 } = await supabase.from('news_trends_keywords').select('*').limit(1);
  console.log('news_trends_keywords fields:', kw ? Object.keys(kw[0]) : err1);

  const { data: ins, error: err2 } = await supabase.from('news_trends_insights').select('*').limit(1);
  console.log('news_trends_insights fields:', ins ? Object.keys(ins[0]) : err2);

  const { data: art, error: err3 } = await supabase.from('news_trends_articles').select('*').limit(1);
  console.log('news_trends_articles fields:', art ? Object.keys(art[0]) : err3);
}

check();
