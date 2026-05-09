const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
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

const today = new Date().toISOString().split('T')[0];

const topKeywords = [
  { target_date: today, keyword: "남해 반값 여행", rank: 1, section: "관광", search_volume: 9800 },
  { target_date: today, keyword: "소 맥거핀 찰칵 세계 여행", rank: 1, section: "여행", search_volume: 9500 },
  { target_date: today, keyword: "에어로 케이", rank: 1, section: "항공", search_volume: 9200 },
  { target_date: today, keyword: "소녀 종말 여행", rank: 2, section: "여행", search_volume: 8800 }
];

async function updateRankings() {
  console.log('Inserting top ranking keywords for:', today);
  
  const { data, error } = await supabase
    .from('news_trends_keywords')
    .insert(topKeywords);

  if (error) {
    console.error('Error inserting rankings:', error);
  } else {
    console.log('Successfully updated top rankings!');
  }
}

updateRankings();
