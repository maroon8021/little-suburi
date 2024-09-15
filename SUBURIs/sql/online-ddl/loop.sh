#!/bin/bash

# MySQL接続情報
DB_USER="root"
DB_PASSWORD="rootpass"
DB_NAME="sql"

# 終了時間（現在の時間 + 1.5分）
end_time=$((SECONDS + 90))

# 2分間ループ
while [ $SECONDS -lt $end_time ]; do
  # ランダムに従業員IDを選択
  random_id=$((RANDOM % 50000 + 1))

  # トランザクション内でSELECTを実行
  mysql --silent -u $DB_USER -p$DB_PASSWORD -h 127.0.0.1 -P 59003 $DB_NAME -e "
  START TRANSACTION;
  SELECT * FROM employees WHERE id = $random_id for update;
  SELECT SLEEP(5);
  COMMIT;
  "

  # ランダムにステータスを選択してUPDATE（トランザクション内）
  statuses=("active" "inactive" "on_leave")
  new_status=${statuses[$RANDOM % ${#statuses[@]}]}

  mysql --silent -u $DB_USER -p$DB_PASSWORD -h 127.0.0.1 -P 59003 $DB_NAME -e "
  START TRANSACTION;
  UPDATE employees SET status = '$new_status' WHERE id = $random_id;
  SELECT SLEEP(3);
  COMMIT;
  "

  # 1秒待機（頻度調整のため）
  # sleep 1
done

echo "2 minutes of SELECT and UPDATE operations completed."
