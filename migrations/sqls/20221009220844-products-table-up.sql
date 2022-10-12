CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(250),
    price real,
    category VARCHAR(100)
);