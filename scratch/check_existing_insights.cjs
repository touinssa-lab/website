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

async function checkExistingData() {
  const { data, error } = await supabase
    .from('news_trends_insights')
    .select('type')
    .limit(10);
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Existing types:', data);
  }
}

checkExistingData();
