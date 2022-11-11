# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)
- Delete [token required]

#### Users
- Index [token required]
- Show [token required]
- Create
- Delete [token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
- Create[token required]
- Delete [token required]

|Path|HTTP method|Description|
|---|---|---|
|/|GET|main api endpoint that welcoms the user|
|/users|GET|gets a list of users signed up in the app|
|/users/:id|GET|gets a user by a given user id|
|/users|POST|signs up a new user|
|/users/:id|DELETE|deletes a user from db
|/products|GET|gets a list of products stored in db|
|/prosucts/:id|GET|gets a product by a given product id|
|/products|POST|adds new product to db|
|/products/category/:category|GET|gets products with a given category|
|/products/top5|GET|gets top 5 ordered products|
|/products/:id|DELETE|deletes a product from db
|orders/|GET:user_id/current|gets active order made by a user with a given id|
|orders/:user_id/completed|GET|gets completed orders by a user with the his id|
|/orders|POST|adds a new order|
|/orders/:order_id/products|POST|add a new product to an active order with its id|
|/orders/:id|DELETE|deletes an order from db

## Data Shapes
#### product
- id SERIAL PRIMARY KEY
- name VARCHAR
- price real
- category VARCHAR

#### User
- id SERIAL PRIMARY KEY
- first_name VARCHAR
- last_name VARCHAR
- password_digest VARCHAR

#### orders
- id SERIAL PRIMARY KEY
- user_id Integer REFERENCES users
- status VARCHAR

#### order_product
- id SERIAL PRIMARY KEY
- order_id Integer REFERENCES orders
- product_id Integer REFERENCES products
- quantity Integer NOT NULL

### Schema
 Schema |      Name       | Type  |
--------+-----------------+-------+
 public | migrations      | table |
 public | orders          | table |
 public | orders_products | table |
 public | products        | table |
 public | users           | table |
 - users table
 id | first_name | last_name  | password_digest
- products table
 id |   name    | price | category
- orders table 
id | user_id |  status
- orders_products table
 id | order_id | product_id | quantity