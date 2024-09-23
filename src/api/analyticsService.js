import axios from 'axios';
import { INSTAGRAM_GRAPH_API_URL, INSTAGRAM_ACCESS_TOKEN } from '../config';

export async function getInsights() {
  const url = `${INSTAGRAM_GRAPH_API_URL}/your_instagram_account_id/insights?metric=impressions,reach,engagement&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error('Error fetching insights:', error);
  }
}
