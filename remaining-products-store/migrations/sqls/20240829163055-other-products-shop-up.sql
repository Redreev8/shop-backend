CREATE TABLE other_products_shop(
    quantity_shelf integer,
    quantity_order integer,
    plu integer references products(plu),
    shop_id integer references shops(id), 
    PRIMARY KEY (shop_id, plu)
);

ALTER TABLE other_products_shop
    ADD CONSTRAINT constraint_name UNIQUE (shop_id, plu);