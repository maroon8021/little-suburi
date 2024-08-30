-- テーブル作成
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    salary NUMERIC(10, 2)
);

CREATE TABLE audit_log (
    log_id SERIAL PRIMARY KEY,
    employee_id INT,
    changed_at TIMESTAMP,
    old_salary NUMERIC(10, 2),
    new_salary NUMERIC(10, 2)
);

-- トリガー関数作成
CREATE OR REPLACE FUNCTION log_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_log (employee_id, changed_at, old_salary, new_salary)
    VALUES (OLD.id, NOW(), OLD.salary, NEW.salary);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- トリガー作成
CREATE TRIGGER trg_after_update_log_changes
AFTER UPDATE ON employees
FOR EACH ROW
EXECUTE FUNCTION log_changes();

-- サンプルデータ挿入
INSERT INTO employees (name, salary) VALUES ('John Doe', 50000);

-- サンプルデータ更新（トリガー発火）
UPDATE employees SET salary = 55000 WHERE id = 1;

-- 変更履歴確認
SELECT * FROM audit_log;  -- 更新履歴が記録されています
