-- テーブル作成
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    age INT
);

-- トリガー関数作成
CREATE OR REPLACE FUNCTION check_age()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.age < 0 THEN
        RAISE EXCEPTION '年齢は0以上でなければなりません。';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- トリガー作成
CREATE TRIGGER trg_before_insert_check_age
BEFORE INSERT ON employees
FOR EACH ROW
EXECUTE FUNCTION check_age();

-- サンプルデータ挿入（成功例）
INSERT INTO employees (name, age) VALUES ('John Doe', 30);

-- サンプルデータ挿入（失敗例）
INSERT INTO employees (name, age) VALUES ('Jane Doe', -5);  -- ここでエラーが発生します
