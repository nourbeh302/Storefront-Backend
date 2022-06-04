# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

###  API Endpoints
#### Users

- Index 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - none
  * Usage             - gets all users
  * http://localhost:8000/users

- Show 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - id: number
  * Usage             - gets single user
  * http://localhost:8000/users/:id
 

- Create
  * Method           -  POST
  * Authorization required    - No
  * Parameters        - user: User
  * Usage             - create a new user
  * http://localhost:8000/users


- Update
  * Method           -  PUT
  * Authorization required    - Bearer <token>
  * Parameters        -  newUser: User, oldUserId: number
  * Usage             -  updates a user
  * http://localhost:8000/users/:id

- Delete
  * Method           -  DELETE
  * Authorization required    - Bearer <token>
  * Parameters        -  id
  * Usage             -  deletes a user
  * http://localhost:8000/users/:id

#### Products

- Index 
  * Method           -  GET
  * Authorization required    - No
  * Parameters        - none
  * Usage             - gets all products
  * http://localhost:8000/products

- Show 
  * Method           -  GET
  * Authorization required    - No
  * Parameters        - id: number
  * Usage             - gets single product
  * http://localhost:8000/products/:id
 

- Create
  * Method           -  POST
  * Authorization required    - Bearer <token>
  * Parameters        - product: Product
  * Usage             - creates a new product
  * http://localhost:8000/products


- Update
  * Method           -  PUT
  * Authorization required    - Bearer <token>
  * Parameters        - newProduct: Product, oldProductId: number
  * Usage             - updates a product
  * http://localhost:8000/products/:id

- Delete
  * Method           -  DELETE
  * Authorization required    - Bearer <token>
  * Parameters        - id: number
  * Usage             - deletes a product
  * http://localhost:8000/products/:id

#### Orders

- Index 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - none
  * Usage             - gets all orders
  * http://localhost:8000/orders

- Show 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - id: number
  * Usage             - gets single order
  * http://localhost:8000/orders/:id
 

- Create
  * Method           -  POST
  * Authorization required    - Bearer <token>
  * Parameters        - status: string, userId: number
  * Usage             - creates a new order
  * http://localhost:8000/orders


- Update
  * Method           -  PUT
  * Authorization required    - Bearer <token>
  * Parameters        - status: string
  * Usage             - updates an order
  * http://localhost:8000/orders/:id

- Delete
  * Method           -  DELETE
  * Authorization required    - Bearer <token>
  * Parameters        - id: number
  * Usage             - deletes an order
  * http://localhost:8000/orders/:id

- Add Product
  * Method           -  POST
  * Authorization required    - Bearer <token>
  * Parameters        - orderId: number, productId: number, quantity: number
  * Usage             - adds products to an existing order
  * http://localhost:8000/orders/:id/products
  

### Data Schema
#### users table

| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| firstName | VARCHAR(50) | NOT NULL |
| lastName | VARCHAR(50) | NOT NULL |
| password | TEXT | NOT NULL |
#### products table
| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| price | INTEGER | NOT NULL |

#### orders table
| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| status | VARCHAR(20) | |
| user_id | INTEGER |  REFERENCES users(id) |

#### orders_products table
| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| orderId | INTEGER | REFERENCES orders(id) |
| productId | INTEGER | REFERENCES products(id) |
| quantity | INT | NOT NULL |

