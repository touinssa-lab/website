import { BetaAnalyticsDataClient } from '@google-analytics/data';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const propertyId = process.env.GOOGLE_GA4_PROPERTY_ID;
const credentials = process.env.GOOGLE_CREDENTIALS ? JSON.parse(process.env.GOOGLE_CREDENTIALS) : null;

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: credentials?.client_email,
    private_key: credentials?.private_key?.replace(/\\n/g, '\n'),
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!propertyId || !credentials) {
    return res.status(500).json({ error: 'Missing Google Analytics configuration' });
  }

  try {
    // 1. Fetch Real-time Active Users (Last 30 mins)
    const [realtimeResponse] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${propertyId}`,
      metrics: [{ name: 'activeUsers' }],
    });

    const activeUsers = parseInt(realtimeResponse.rows?.[0]?.metricValues?.[0]?.value || '0');

    // 2. Fetch Weekly Active Users (for the chart)
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    });

    const chartData = response.rows?.map(row => ({
      date: row.dimensionValues?.[0].value,
      count: parseInt(row.metricValues?.[0].value || '0'),
    })) || [];

    // 3. Fetch Total Stats (Pageviews, Total Users)
    const [statsResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'sessions' }
      ],
    });

    const totals = {
      activeUsers: parseInt(statsResponse.rows?.[0]?.metricValues?.[0]?.value || '0'),
      pageViews: parseInt(statsResponse.rows?.[0]?.metricValues?.[1]?.value || '0'),
      sessions: parseInt(statsResponse.rows?.[0]?.metricValues?.[2]?.value || '0'),
    };

    return res.status(200).json({
      activeUsers,
      chartData,
      totals,
    });
  } catch (error: any) {
    console.error('GA4 API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
