import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '../config';

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateCaption(topic) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Write a creative Instagram caption about ${topic}.`,
    max_tokens: 50,
  });
  return response.data.choices[0].text.trim();
}
