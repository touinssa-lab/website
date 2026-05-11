import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mdcgzvfeazrmvkpanpho.supabase.co';
const supabaseKey = 'sb_publishable_HX_nDGxsiEvlV-E3ztJpRw_Va5P13tO';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixPaths() {
  const targetDate = '2026-05-10';
  console.log(`Fixing image paths for ${targetDate}...`);

  try {
    // 1. Get all articles for May 10
    const { data: articles, error: fetchError } = await supabase
      .from('news_trends_articles')
      .select('id, thumbnail')
      .eq('target_date', targetDate);

    if (fetchError) throw fetchError;

    console.log(`Found ${articles.length} articles.`);

    // 2. Update each article's thumbnail path
    for (const article of articles) {
      if (article.thumbnail && article.thumbnail.includes('/20260510/')) {
        const newPath = article.thumbnail.replace('/20260510/', '/2026-05-10/');
        const { error: updateError } = await supabase
          .from('news_trends_articles')
          .update({ thumbnail: newPath })
          .eq('id', article.id);

        if (updateError) {
          console.error(`Error updating article ${article.id}:`, updateError);
        } else {
          console.log(`Updated article ${article.id}: ${newPath}`);
        }
      }
    }

    console.log('Path fix completed.');
  } catch (err) {
    console.error('Error during path fix:', err);
  }
}

fixPaths();
