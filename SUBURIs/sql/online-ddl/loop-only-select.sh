#!/bin/bash

# MySQL接続情報
DB_USER="root"
DB_PASSWORD="rootpass"
DB_NAME="sql"

# MySQLクエリ
mysql -u$DB_USER -p$DB_PASSWORD -h 127.0.0.1 -P 59003 $DB_NAME <<EOF
DROP PROCEDURE IF EXISTS loop_procedure;
DELIMITER //
CREATE PROCEDURE loop_procedure()
BEGIN
    DECLARE counter INT DEFAULT 0;
    DECLARE random_id INT;

    WHILE counter < 25 DO
        SET random_id = FLOOR(1 + RAND() * 50000);

        START TRANSACTION;
        SELECT * FROM employees WHERE id = random_id FOR UPDATE;
        DO SLEEP(5);
        COMMIT;

        SET counter = counter + 1;
    END WHILE;

    SELECT CONCAT('Completed 25 iterations of SELECT and UPDATE operations.') AS result;
END //
DELIMITER ;

CALL loop_procedure();
DROP PROCEDURE loop_procedure;
EOF

echo "MySQL operations completed."


# # MySQL接続情報
# DB_USER="root"
# DB_PASSWORD="rootpass"
# DB_NAME="sql"

# # 終了時間（現在の時間 + 1.5分）
# end_time=$((SECONDS + 90))

# # 2分間ループ
# while [ $SECONDS -lt $end_time ]; do
#   # ランダムに従業員IDを選択
#   random_id=$((RANDOM % 50000 + 1))

#   # トランザクション内でSELECTを実行
#   mysql --silent -u $DB_USER -p$DB_PASSWORD -h 127.0.0.1 -P 59003 $DB_NAME -e "
#   START TRANSACTION;
#   SELECT * FROM employees WHERE id = $random_id FOR UPDATE;
#   SELECT SLEEP(5);
#   COMMIT;
#   "
# done

# echo "2 minutes of SELECT and UPDATE operations completed."
