-- テーブル作成
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    department_id INT REFERENCES departments(id)
);

-- トリガー関数作成
CREATE OR REPLACE FUNCTION cleanup_employees()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM employees
    WHERE department_id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- トリガー作成
CREATE TRIGGER trg_after_delete_cleanup_employees
AFTER DELETE ON departments
FOR EACH ROW
EXECUTE FUNCTION cleanup_employees();

-- サンプルデータ挿入
INSERT INTO departments (name) VALUES ('HR');
INSERT INTO employees (name, department_id) VALUES ('John Doe', 1);

-- 部署削除（トリガー発火）
DELETE FROM departments WHERE id = 1;

-- 従業員テーブル確認
SELECT * FROM employees;  -- John Doeのレコードが削除されています
