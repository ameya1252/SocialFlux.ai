import os
import requests
import json
from flask import Flask, request, jsonify
from apscheduler.schedulers.background import BackgroundScheduler
import openai
from datetime import datetime

app = Flask(__name__)

# OpenAI API key (replace with your own key)
openai.api_key = os.getenv("OPENAI_API_KEY")

# Instagram Access Token (replace with your token)
INSTAGRAM_ACCESS_TOKEN = os.getenv("INSTAGRAM_ACCESS_TOKEN")
INSTAGRAM_GRAPH_API_URL = "https://graph.facebook.com/v15.0/"

# Function to post to Instagram
def post_to_instagram(caption, image_url):
    url = f"{INSTAGRAM_GRAPH_API_URL}/your_instagram_account_id/media"
    payload = {
        'image_url': image_url,
        'caption': caption,
        'access_token': INSTAGRAM_ACCESS_TOKEN
    }
    
    # Send the request to Instagram API
    r = requests.post(url, data=payload)
    if r.status_code == 200:
        print("Post created successfully!")
        # Now publish the post
        publish_url = f"{INSTAGRAM_GRAPH_API_URL}/your_instagram_account_id/media_publish"
        media_id = r.json()['id']
        publish_payload = {
            'creation_id': media_id,
            'access_token': INSTAGRAM_ACCESS_TOKEN
        }
        publish_r = requests.post(publish_url, data=publish_payload)
        if publish_r.status_code == 200:
            print("Post published successfully!")
        else:
            print(f"Error in publishing: {publish_r.text}")
    else:
        print(f"Error in creating post: {r.text}")

# Function to generate AI-based captions using OpenAI
def generate_caption(topic):
    response = openai.Completion.create(
      engine="text-davinci-003",
      prompt=f"Write a creative Instagram caption about {topic}.",
      max_tokens=50
    )
    return response.choices[0].text.strip()

# Scheduler to auto-post at certain times
scheduler = BackgroundScheduler()

def scheduled_post(topic, image_url):
    caption = generate_caption(topic)
    post_to_instagram(caption, image_url)

# Route to schedule a post
@app.route('/schedule_post', methods=['POST'])
def schedule_post():
    data = request.json
    topic = data['topic']
    image_url = data['image_url']
    post_time = data['post_time']  # Expecting ISO format datetime string

    # Schedule post
    post_datetime = datetime.fromisoformat(post_time)
    scheduler.add_job(scheduled_post, 'date', run_date=post_datetime, args=[topic, image_url])

    return jsonify({"message": "Post scheduled successfully!"})

# Route to get engagement insights (simplified)
@app.route('/get_insights', methods=['GET'])
def get_insights():
    url = f"{INSTAGRAM_GRAPH_API_URL}/your_instagram_account_id/insights?metric=impressions,reach,engagement&access_token={INSTAGRAM_ACCESS_TOKEN}"
    r = requests.get(url)
    if r.status_code == 200:
        insights = r.json()
        return jsonify(insights)
    else:
        return jsonify({"error": r.text}), r.status_code

# Run Flask app
if __name__ == '__main__':
    scheduler.start()
    app.run(debug=True)
