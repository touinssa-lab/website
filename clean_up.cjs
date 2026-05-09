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

async function cleanUp() {
  const today = '2026-05-09';
  console.log(`Cleaning up data for ${today}...`);
  
  const { error: deleteError } = await supabase
    .from('news_trends_articles')
    .delete()
    .eq('target_date', today);

  if (deleteError) {
    console.error('Delete error:', deleteError);
  } else {
    console.log('Successfully deleted all news articles for 5/9.');
    
    // Verification
    const { data, error: checkError } = await supabase
      .from('news_trends_articles')
      .select('id')
      .eq('target_date', today);
      
    if (checkError) {
      console.error('Check error:', checkError);
    } else {
      console.log(`Remaining 5/9 articles: ${data.length}`);
    }
  }
}

cleanUp();
