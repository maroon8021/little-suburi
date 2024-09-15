#!/bin/bash

# MySQL接続情報
DB_USER="root"
DB_PASSWORD="rootpass"
DB_NAME="sql"

# バッチサイズを設定（1000件ずつ）
BATCH_SIZE=1000

# バッチ用のINSERT文を格納する変数
insert_query="INSERT INTO employees (name, position, status, hire_date) VALUES"

# 5万件データを挿入
for i in $(seq 1 50000); do
  # 名前をランダムに生成（例：Employee_1, Employee_2,...）
  name="Employee_$i"
  
  # ランダムな役職（junior, senior, manager）を選択
  positions=("junior" "senior" "manager")
  position=${positions[$RANDOM % ${#positions[@]}]}

  # ランダムなステータス（active, inactive, on_leave）を選択
  statuses=("active" "inactive" "on_leave")
  status=${statuses[$RANDOM % ${#statuses[@]}]}

  # ランダムな日付を生成（例：2010-01-01 から 2023-12-31 の間）
  year=$((RANDOM % 14 + 2010))
  month=$((RANDOM % 12 + 1))
  day=$((RANDOM % 28 + 1))
  hire_date="$year-$(printf "%02d" $month)-$(printf "%02d" $day)"

  # バッチにINSERTデータを追加
  insert_query="$insert_query ('$name', '$position', '$status', '$hire_date'),"

  # バッチサイズに達したらクエリを実行
  if (( $i % $BATCH_SIZE == 0 )); then
    # 最後のカンマを削除してクエリを実行
    insert_query=${insert_query%,}
    mysql --silent -u$DB_USER -p$DB_PASSWORD -h 127.0.0.1 -P 59003 $DB_NAME -e "$insert_query;"

    # 進捗表示
    echo "$i rows inserted..."

    # INSERT文をリセット
    insert_query="INSERT INTO employees (name, position, status, hire_date) VALUES"
  fi
done

# 残りのレコードがある場合は挿入
if [[ $insert_query != "INSERT INTO employees (name, position, status, hire_date) VALUES" ]]; then
  # 最後のカンマを削除してクエリを実行
  insert_query=${insert_query%,}
  mysql --silent -u$DB_USER -p$DB_PASSWORD -h 127.0.0.1 -P 59003 $DB_NAME -e "$insert_query;"
fi

echo "50,000 rows inserted successfully."
