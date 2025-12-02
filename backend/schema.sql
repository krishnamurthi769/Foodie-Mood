-- Create Reels Table
CREATE TABLE IF NOT EXISTS reels (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    description TEXT,
    video_url TEXT NOT NULL,
    likes_count INT DEFAULT 0,
    is_food_content BOOLEAN DEFAULT FALSE
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    reel_id INT REFERENCES reels(id) ON DELETE CASCADE,
    restaurant_name VARCHAR(255) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    discount_price DECIMAL(10, 2),
    rating FLOAT,
    delivery_time_min INT
);

-- Seed Data (Optional, for testing)
INSERT INTO reels (username, avatar_url, description, video_url, likes_count, is_food_content) VALUES
('foodie_king', 'https://i.pravatar.cc/150?u=foodie_king', 'Best burger in town! 🍔 #foodie #burger', 'https://res.cloudinary.com/demo/video/upload/v1690000000/samples/food/burger.mp4', 1200, TRUE),
('travel_diaries', 'https://i.pravatar.cc/150?u=travel_diaries', 'Sunset in Bali 🌅', 'https://res.cloudinary.com/demo/video/upload/v1690000000/samples/sea-turtle.mp4', 850, FALSE),
('pizza_lover', 'https://i.pravatar.cc/150?u=pizza_lover', 'Cheesy goodness 🍕', 'https://res.cloudinary.com/demo/video/upload/v1690000000/samples/food/pot-mussels.mp4', 2300, TRUE);

INSERT INTO products (reel_id, restaurant_name, item_name, price, discount_price, rating, delivery_time_min) VALUES
(1, 'Burger King', 'Whopper Meal', 350.00, 299.00, 4.5, 30),
(3, 'Pizza Hut', 'Cheese Burst Pizza', 600.00, 450.00, 4.2, 45);
