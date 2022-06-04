/* Replace with your SQL commands */

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(20),
    user_id INTEGER REFERENCES users(id)
);