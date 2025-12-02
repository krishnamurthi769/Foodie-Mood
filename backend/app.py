from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import os
import random

app = Flask(__name__)
CORS(app)

# Mock Data (In-memory storage since we might not have a live DB connection immediately)
# In a real scenario, we would connect to Postgres using psycopg2
MOCK_REELS = [
    {
        "id": 1,
        "username": "foodie_king",
        "avatar_url": "https://ui-avatars.com/api/?name=Foodie+King&background=random",
        "description": "Best burger in town! 🍔 #foodie #burger",
        "video_url": "https://assets.mixkit.co/videos/preview/mixkit-delicious-burger-with-ingredients-falling-down-1726-large.mp4",
        "likes_count": 1240,
        "is_food_content": True,
        "product": {
            "id": 101,
            "restaurant_name": "Burger Manor",
            "item_name": "Double Cheese Whopper",
            "price": 350,
            "discount_price": 299,
            "rating": 4.5,
            "delivery_time_min": 30
        }
    },
    {
        "id": 2,
        "username": "travel_vibe",
        "avatar_url": "https://ui-avatars.com/api/?name=Travel+Vibe&background=random",
        "description": "Sunset views in Bali 🌅 #travel #wanderlust",
        "video_url": "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
        "likes_count": 850,
        "is_food_content": False,
        "product": None
    },
    {
        "id": 3,
        "username": "pizza_lover",
        "avatar_url": "https://ui-avatars.com/api/?name=Pizza+Lover&background=random",
        "description": "Cheesy goodness 🍕 #pizza #cheese",
        "video_url": "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-pizza-being-cut-1734-large.mp4",
        "likes_count": 2300,
        "is_food_content": True,
        "product": {
            "id": 102,
            "restaurant_name": "Pizza Paradise",
            "item_name": "Pepperoni Cheese Burst",
            "price": 600,
            "discount_price": 450,
            "rating": 4.8,
            "delivery_time_min": 45
        }
    },
    {
        "id": 4,
        "username": "dance_star",
        "avatar_url": "https://ui-avatars.com/api/?name=Dance+Star&background=random",
        "description": "New choreo! 💃 #dance #trending",
        "video_url": "https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-in-a-party-4360-large.mp4",
        "likes_count": 5000,
        "is_food_content": False,
        "product": None
    },
     {
        "id": 5,
        "username": "sushi_master",
        "avatar_url": "https://ui-avatars.com/api/?name=Sushi+Master&background=random",
        "description": "Fresh Salmon Sashimi 🍣 #sushi #japanesefood",
        "video_url": "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-sushi-roll-slices-3306-large.mp4",
        "likes_count": 1800,
        "is_food_content": True,
        "product": {
            "id": 103,
            "restaurant_name": "Tokyo Treats",
            "item_name": "Salmon Sashimi Platter",
            "price": 1200,
            "discount_price": 999,
            "rating": 4.9,
            "delivery_time_min": 35
        }
    }
]

@app.route('/api/feed', methods=['GET'])
def get_feed():
    mode = request.args.get('mode', 'normal')
    
    if mode == 'foodie':
        filtered_reels = [r for r in MOCK_REELS if r['is_food_content']]
        return jsonify(filtered_reels)
    else:
        # Return a mix, maybe shuffle for randomness
        return jsonify(MOCK_REELS)

@app.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    data = request.json
    product_id = data.get('product_id')
    
    # Simulate network delay
    time.sleep(0.5)
    
    # Find product details (mock logic)
    product = None
    for reel in MOCK_REELS:
        if reel['product'] and reel['product']['id'] == product_id:
            product = reel['product']
            break
            
    if product:
        return jsonify({
            "success": True,
            "message": "Item added to cart",
            "cart_item": product
        })
    else:
        return jsonify({"success": False, "message": "Product not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
