CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(50),
    telegram_api_id VARCHAR(50),
    telegram_api_hash VARCHAR(255),
    telegram_session TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);