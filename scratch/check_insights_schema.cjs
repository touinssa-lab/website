require('dotenv').config();
const { createClient } = require('@supabase/supabase-client');

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkSchema() {
  const { data, error } = await supabase
    .from('news_trends_insights')
    .select('*')
    .limit(1);
  
  if (error) {
    console.error('Error fetching insights:', error);
  } else {
    console.log('Sample insight data:', data);
    console.log('Columns:', data.length > 0 ? Object.keys(data[0]) : 'No data found');
  }
}

checkSchema();
