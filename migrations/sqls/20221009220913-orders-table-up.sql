CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    product_id Integer REFERENCES products(id),
    user_id Integer REFERENCES users(id),
    quantity Integer,
    status VARCHAR(10)
);