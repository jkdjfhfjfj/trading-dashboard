CREATE TABLE trades (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    symbol VARCHAR(50),
    action VARCHAR(10),
    entry NUMERIC,
    stop_loss NUMERIC,
    take_profit NUMERIC,
    volume NUMERIC DEFAULT 1,
    status VARCHAR(50) DEFAULT 'pending',
    reason TEXT,
    executed_at TIMESTAMP,
    closed_at TIMESTAMP,
    realized_pnl NUMERIC,
    ctrader_order_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);