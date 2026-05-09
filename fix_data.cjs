const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
  });
  return env;
}

const env = loadEnv();
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function fix() {
  const today = '2026-05-09';
  const yesterday = '2026-05-08';
  const allowed = [
    '춘천 마임축제',
    '보성 다향대축제',
    '친환경 하이브리드 항공편',
    '연등회 연등행렬',
    '서울 재즈 페스티벌'
  ];

  console.log('Fetching all insights for today...');
  const { data, error } = await supabase
    .from('news_trends_insights')
    .select('id, keyword, target_date')
    .eq('target_date', today);

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  console.log(`Found ${data.length} items for today.`);

  for (const item of data) {
    if (!allowed.includes(item.keyword)) {
      console.log(`Moving "${item.keyword}" to ${yesterday}...`);
      const { error: updateError } = await supabase
        .from('news_trends_insights')
        .update({ target_date: yesterday })
        .eq('id', item.id);
      
      if (updateError) {
        console.error(`Failed to move ${item.keyword}:`, updateError);
      }
    } else {
      console.log(`Keeping "${item.keyword}" for today.`);
    }
  }

  console.log('Cleanup complete.');
}

fix();
