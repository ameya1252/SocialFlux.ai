import { generateCaption } from '../api/openaiService';
import { postToInstagram } from '../api/instagramService';

export async function schedulePost(topic, imageUrl, postTime) {
  const caption = await generateCaption(topic);
  console.log(`Generated Caption: ${caption}`);

  setTimeout(() => {
    postToInstagram(caption, imageUrl);
  }, new Date(postTime) - new Date());  // Schedule post at the exact post time
}
