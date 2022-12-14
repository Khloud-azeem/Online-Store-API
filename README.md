# Storefront Backend Project

## Getting started
```
git clone https://github.com/Khloud-azeem/Online-Store-API.git
```

## Database 

### Setup
Create 2 Postgres Sql databases one for development and one for testing with the following:
- Host: localhost
- Port: 5432
- Development db name: store_front_dev
- Testing db name: store_front_test
- Username: {your username}
- Password: {your password}

### Connection
In terminal:
- Connect to the default postgres databse as the server's root user 
```
psql -U postgres
```
- Create user 
```
CREATE USER {username} WITH PASSWORD {password}
```
- Create dev and test database 
```
CREATE DATABASE store_front_dev
```
```
CREATE DATABASE store_front_test
```
- Connect to the database and grant all privilages 
    - Grant for dev database
    ```
    \c store_front_dev
    GRANT ALL PROIVILEGES ON DATABASE store_front_dev TO {username}
    ```
    - Grant for test database
    ```
    \c store_front_test
    GRANT ALL PROIVILEGES ON DATABASE store_front_test TO {username}
    ```

### Schema
 List of relations:
 Schema |      Name       | Type  |
--------|-----------------|-------|
 public | migrations      | table |
 public | orders          | table |
 public | orders_products | table |
 public | products        | table |
 public | users           | table |
 
 - users table

 id | first_name | last_name  | password_digest|
 ---|------------|------------|----------------|

- products table

id |   name    | price | category|
 ---|------------|------------|----------------|

- orders table 

id | user_id | status |
 ---|------------|------------|

- orders_products table

id | order_id | product_id | quantity|
 ---|------------|------------|----------------|

### Environment
create .env file in your root directory with the following :
```
POSTGRES_HOST={your db host}
POSTGRES_DB={your development db name}
POSTGRES_TEST_DB={your testing db name}
POSTGRES_USER={your username}
POSTGRES_PASSWORD={your password}
ENV=dev
SALT_ROUNDS = 10
BCRYPT_PASSWORD = {your bcrypt password}
TOKEN_SECRET = {your jwt secret}
```

### Package installation
```
npm install
```

## Run the app
- Backend server is running on port 3000 
- Migrate database use 
```
db-migrate up
```
- Run the application use
```
npm run watch
```
- Navigate to ```http://localhost:3000/```

### Testing
to run test cases use
```
npm run test
```

## Endpoints
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


<!-- # Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission! -->
