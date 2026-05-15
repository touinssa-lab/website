import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { webTrendKeywords, insightCards } from '../src/data/aiHotKeywords.js';
import { naverNewsData } from '../src/data/naverNewsData.js';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.VITE_SUPABASE_ANON_KEY as string
);

const TARGET_DATE = '2026-05-14';

async function sync() {
  console.log(`Starting DB sync for ${TARGET_DATE}...`);

  // 1. Sync keywords
  const keywordsData = webTrendKeywords.map(k => ({
    target_date: TARGET_DATE,
    section: k.section,
    rank: k.rank,
    keyword: k.keyword,
    interest: k.interest,
    change_value: k.change
  }));
  
  const { error: kwError } = await supabase.from('news_trends_keywords').upsert(keywordsData, { onConflict: 'target_date, section, rank' });
  if (kwError) console.error('Keyword Sync Error:', kwError);
  else console.log(`✓ Keywords synced (${keywordsData.length} rows)`);

  // 2. Sync insights
  const insightsData = insightCards.map(i => ({
    target_date: TARGET_DATE,
    keyword: i.keyword,
    category: i.category,
    reason: i.reason,
    type: i.type
  }));

  const { error: insError } = await supabase.from('news_trends_insights').upsert(insightsData, { onConflict: 'target_date, keyword' });
  if (insError) console.error('Insight Sync Error:', insError);
  else console.log(`✓ Insights synced (${insightsData.length} rows)`);

  // 3. Sync articles
  const articlesData = naverNewsData.map(a => ({
    target_date: TARGET_DATE,
    title: a.title,
    press: a.press,
    excerpt: a.excerpt,
    category: a.category,
    tag: a.tag,
    link: a.link,
    thumbnail: a.thumbnail
  }));

  const { error: artError } = await supabase.from('news_trends_articles').upsert(articlesData, { onConflict: 'target_date, title' });
  if (artError) console.error('Article Sync Error:', artError);
  else console.log(`✓ Articles synced (${articlesData.length} rows)`);

  console.log('Sync complete.');
}

sync();
