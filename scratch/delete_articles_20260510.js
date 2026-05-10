import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mdcgzvfeazrmvkpanpho.supabase.co';
const supabaseKey = 'sb_publishable_HX_nDGxsiEvlV-E3ztJpRw_Va5P13tO';
const supabase = createClient(supabaseUrl, supabaseKey);

const targetDate = '2026-05-10';

async function deleteArticles() {
  try {
    console.log(`Deleting articles for ${targetDate}...`);
    const { error } = await supabase
      .from('news_trends_articles')
      .delete()
      .eq('target_date', targetDate);

    if (error) throw error;
    console.log('Successfully deleted existing articles.');
  } catch (err) {
    console.error('Error deleting articles:', err);
    process.exit(1);
  }
}

deleteArticles();
