-- テーブル作成
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    total_amount NUMERIC(10, 2) DEFAULT 0
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    quantity INT,
    unit_price NUMERIC(10, 2)
);

-- トリガー関数作成
CREATE OR REPLACE FUNCTION update_order_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE orders
    SET total_amount = total_amount + (NEW.quantity * NEW.unit_price)
    WHERE id = NEW.order_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- トリガー作成
CREATE TRIGGER trg_after_insert_update_order_total
AFTER INSERT ON order_items
FOR EACH ROW
EXECUTE FUNCTION update_order_total();

-- サンプルデータ挿入
INSERT INTO orders (total_amount) VALUES (0);

-- アイテム追加（トリガー発火）
INSERT INTO order_items (order_id, quantity, unit_price) VALUES (1, 2, 50.00);

-- 注文の総額確認
SELECT * FROM orders;  -- total_amountが100.00に更新されています
