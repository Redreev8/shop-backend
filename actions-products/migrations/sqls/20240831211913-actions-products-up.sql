CREATE TABLE actions_products(
    id serial primary key,
    action VARCHAR(20),
    date DATE DEFAULT CURRENT_DATE,
    plu INTEGER,
    shop_id INTEGER NULL 
);