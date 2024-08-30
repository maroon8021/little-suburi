-- テーブル作成
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    stock INT
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    quantity INT,
    status VARCHAR(20)
);

-- トリガー関数作成
CREATE OR REPLACE FUNCTION adjust_inventory()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'Cancelled' THEN
        UPDATE products
        SET stock = stock + OLD.quantity
        WHERE id = OLD.product_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- トリガー作成
CREATE TRIGGER trg_after_update_adjust_inventory
AFTER UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION adjust_inventory();

-- サンプルデータ挿入
INSERT INTO products (name, stock) VALUES ('Product A', 100);
INSERT INTO orders (product_id, quantity, status) VALUES (1, 10, 'Confirmed');

-- ステータス更新（トリガー発火）
UPDATE orders SET status = 'Cancelled' WHERE id = 1;

-- 在庫確認
SELECT * FROM products;  -- stockが110に更新されています
