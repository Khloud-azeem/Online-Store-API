CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    user_id Integer REFERENCES users(id),
    status VARCHAR(10)
);