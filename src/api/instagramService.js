import axios from 'axios';
import { INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_GRAPH_API_URL } from '../config';

export async function postToInstagram(caption, imageUrl) {
  try {
    const url = `${INSTAGRAM_GRAPH_API_URL}/your_instagram_account_id/media`;
    const payload = {
      image_url: imageUrl,
      caption: caption,
      access_token: INSTAGRAM_ACCESS_TOKEN,
    };
    
    const { data } = await axios.post(url, payload);
    const publishUrl = `${INSTAGRAM_GRAPH_API_URL}/your_instagram_account_id/media_publish`;
    const publishPayload = {
      creation_id: data.id,
      access_token: INSTAGRAM_ACCESS_TOKEN,
    };
    await axios.post(publishUrl, publishPayload);
    console.log('Post published successfully!');
  } catch (error) {
    console.error('Error posting to Instagram:', error);
  }
}
