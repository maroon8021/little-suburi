```sh
cd ./online-ddl
mysql -uroot -p sql < create_table_employees.sql; # rootpass
```

```sh
ALTER TABLE employees
MODIFY COLUMN status ENUM('active', 'inactive', 'on_leave', 'retired') not null,
ALGORITHM=INPLACE;

```

### memo

```sql
START TRANSACTION;
SELECT SLEEP(1);
SELECT count(*) FROM employees;
SELECT SLEEP(3);
COMMIT;

ALTER TABLE employees
MODIFY COLUMN status ENUM('active', 'inactive', 'on_leave', 'retired') not null,
ALGORITHM=INPLACE,
LOCK=NONE;

ALTER TABLE tbl_name ADD PRIMARY KEY (column), ALGORITHM=INPLACE, LOCK=NONE;

SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'employees';

```
