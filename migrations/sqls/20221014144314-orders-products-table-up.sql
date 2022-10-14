CREATE TABLE IF NOT EXISTS orders_products(
    id SERIAL PRIMARY KEY,
    order_id Integer REFERENCES orders(id),
    product_id Integer REFERENCES products(id),
    quantity Integer NOT NULL
);