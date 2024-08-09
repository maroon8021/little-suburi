# index

```
<--- Last few GCs --->

[92164:0x7f9ba0008000]    73427 ms: Mark-sweep 4054.6 (4134.2) -> 4040.0 (4135.4) MB, 3763.9 / 0.0 ms  (average mu = 0.066, current mu = 0.008) allocation failure; scavenge might not succeed
[92164:0x7f9ba0008000]    75527 ms: Mark-sweep 4056.3 (4135.9) -> 4041.6 (4137.2) MB, 2070.2 / 0.0 ms  (average mu = 0.045, current mu = 0.014) allocation failure; scavenge might not succeed


<--- JS stacktrace --->

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
 1: 0x104cb97b5 node::Abort() [/Users/tatsuhikomitsui/.volta/tools/image/node/18.19.0/bin/node]
 2: 0x104cb9995 node::OOMErrorHandler(char const*, bool) [/Users/tatsuhikomitsui/.volta/tools/image/node/18.19.0/bin/node]
 3: 0x104e39eac v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [/Users/tatsuhikomitsui/.volta/tools/image/node/18.19.0/bin/node]
 4: 0x104ffd475 v8::internal::Heap::FatalProcessOutOfMemory(char const*) [/Users/tatsuhikomitsui/.volta/tools/image/node/18.19.0/bin/node]
 5: 0x105001752 v8::internal::Heap::RecomputeLimits(v8::internal::GarbageCollector) [/Users/tatsuhikomitsui/.volta/tools/image/node/18.19.0/bin/node]
 6: 0x104ffe1bc v8::internal::Heap::PerformGarbageCollection(v8::internal::GarbageCollector, v8::internal::GarbageCollectionReason, char const*, v8::GCCallbackFlags) [/Users/tatsuhikomitsui/.volta/tools/image/node/18.19.0/bin/node]
 7: 0x104ffafb4 v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [/Users/tatsuhikomitsui/.volta/tools/image/node/18.19.0/bin/node]
 8: 0x104fed68c v8::internal::HeapAllocator::AllocateRawWithLightRetrySlowPath(int, v8::internal::AllocationType, v8::internal::AllocationOrigin, v8::internal::AllocationAlignment) [/Users/tatsuhikomitsui/.volta/tools/image/node/18.19.0/bin/node]
 9: 0x104fee065 v8::internal::HeapAllocator::AllocateRawWithRetryOrFailSlowPath(int, v8::internal::AllocationType, v8::internal::AllocationOrigin, v8::internal::AllocationAlignment) [/Users/tatsuhikomitsui/.volta/tools/image/node/18.19.0/bin/node]
10: 0x104fd128e v8::internal::Factory::NewFillerObject(int, v8::internal::AllocationAlignment, v8::internal::AllocationType, v8::internal::AllocationOrigin) [/Users/tatsuhikomitsui/.volta/tools/image/node/18.19.0/bin/node]
11: 0x1053ff570 v8::internal::Runtime_AllocateInYoungGeneration(int, unsigned long*, v8::internal::Isolate*) [/Users/tatsuhikomitsui/.volta/tools/image/node/18.19.0/bin/node]
12: 0x1057f1df9 Builtins_CEntry_Return1_DontSaveFPRegs_ArgvOnStack_NoBuiltinExit [/Users/tatsuhikomitsui/.volta/tools/image/node/18.19.0/bin/node]
13: 0x1057c09d8 Builtins_CloneObjectIC [/Users/tatsuhikomitsui/.volta/tools/image/node/18.19.0/bin/node]
14: 0x116639308
```

## from claude

## about index

それぞれの項目について、より詳しく説明いたします。

1. インデックスとパフォーマンスのトレードオフ：

インデックスがクエリのパフォーマンスを向上させる仕組み：

- インデックスは、列の値とその物理的な位置のマッピングを保持します。
- 検索時に、インデックスを使用して該当するデータの位置を素早く特定できます。
- これにより、フルテーブルスキャンを避け、必要なデータにすぐにアクセスできます。

挿入・更新・削除のオーバーヘッド：

- データの変更時、関連するインデックスも更新する必要があります。
- インデックスが多いほど、これらの操作に時間がかかります。
- 特に、B-tree インデックスでは、ツリー構造の再バランスが必要になることがあります。

影響の度合い：

- 読み取りが多いシステムでは、インデックスの恩恵が大きいです。
- 書き込みが多いシステムでは、インデックスのオーバーヘッドが問題になる可能性があります。

2. インデックスとストレージ使用量：

インデックスの構造：

- 一般的な B-tree インデックスは、ツリー構造でデータを保持します。
- 各ノードには、キー値とポインタ（または行 ID）が含まれます。

ストレージ使用量の増加：

- インデックスは、元のデータとは別に保存されます。
- 大規模なテーブルでは、インデックスのサイズが元のテーブルサイズの 10-20%になることもあります。
- 複数のインデックスがある場合、この影響は倍増します。

影響：

- ディスク容量の増加
- バックアップ時間の増加
- メモリキャッシュの効率低下（インデックスもキャッシュする必要があるため）

3. インデックスの有効性評価：

評価方法：

- クエリの実行計画を分析し、インデックスが使用されているか確認
- スロークエリログを監視し、最適化が必要なクエリを特定
- 実際のワークロードでのパフォーマンステストの実施

考慮すべき点：

- クエリのタイプと頻度
- データの分布（インデックスの選択性）
- 書き込み対読み取りの比率

調整方法：

- 未使用のインデックスの削除
- 複合インデックスの作成や順序の最適化
- 部分インデックスの使用

4. データベースのツールの活用：

自動インデックス推奨機能：

- 多くの DBMS が提供する機能で、クエリパターンを分析し、有効なインデックスを提案します。
- 例：PostgreSQL の pg_stat_statements + pg_index_advisor

実行計画分析ツール：

- EXPLAIN コマンドを使用して、クエリの実行計画を確認
- 視覚化ツール（例：pgAdmin, MySQL Workbench）を使用して、実行計画を分かりやすく表示

これらのツールの利点：

- 人間が見落としがちなパターンを特定できる
- 大規模なシステムでの分析を効率化できる
- パフォーマンス問題の早期発見に役立つ

5. 高度なインデックス戦略：

複合インデックス：

- 複数の列を組み合わせたインデックス
- 適用：頻繁に一緒に検索される列の組み合わせに有効

部分インデックス：

- テーブルの一部のみにインデックスを作成
- 適用：特定の条件に合うデータが頻繁に検索される場合

関数インデックス：

- 列の値に関数を適用した結果にインデックスを作成
- 適用：関数を使用した検索が頻繁に行われる場合

ビットマップインデックス：

- 低い濃度（カーディナリティ）のデータに適したインデックス
- 適用：yes/no のような二値データや、限られた値のセットを持つ列

これらの高度な戦略は、特定のユースケースや大規模なシステムで非常に効果的ですが、適用には慎重な分析と検討が必要です。

インデックス戦略の最適化は継続的なプロセスであり、システムの成長とともに定期的な見直しが重要です。

### test data

インデックスによるデータの書き込みへの影響が顕著に現れるシナリオを、具体的なテーブル構成とデータ量のサンプルで説明します。

以下のような注文管理システムのテーブルを考えてみましょう：

```sql
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_customer_id ON orders(customer_id);
CREATE INDEX idx_order_date ON orders(order_date);
CREATE INDEX idx_status ON orders(status);
CREATE INDEX idx_total_amount ON orders(total_amount);
```

このテーブルに対して、以下のようなインデックスが作成されているとします：

1. customer_id
2. order_date
3. status
4. total_amount

データ量のサンプル：

- 1 日あたりの新規注文数：100,000 件
- テーブル全体のレコード数：50,000,000 件（約 500 日分）

このような状況で、インデックスが書き込みパフォーマンスに影響を与える可能性があります：

1. 大量の挿入操作：
   毎日 100,000 件の新規注文が入る場合、各挿入操作で 4 つのインデックスすべてを更新する必要があります。

```sql
INSERT INTO orders (customer_id, order_date, total_amount, status, shipping_address)
VALUES (12345, '2023-07-27 10:30:00', 199.99, 'PENDING', '123 Main St, City, Country');
```

2. 頻繁な更新操作：
   注文のステータスが頻繁に変更される場合（例：PENDING → PROCESSING → SHIPPED）、status インデックスの更新が必要になります。

```sql
UPDATE orders SET status = 'PROCESSING', updated_at = CURRENT_TIMESTAMP
WHERE id = 1000001;
```

3. 範囲更新：
   大量の注文のステータスを一括で更新する場合、複数のインデックスに影響を与える可能性があります。

```sql
UPDATE orders SET status = 'CANCELLED', updated_at = CURRENT_TIMESTAMP
WHERE order_date < '2023-07-20' AND status = 'PENDING';
```

影響と考察：

1. 挿入速度の低下：

   - 各注文の挿入時に 4 つのインデックスを更新する必要があるため、インデックスがない場合と比べて挿入速度が低下します。
   - 1 日 100,000 件の挿入では、この影響が累積し、全体の処理時間が増加する可能性があります。

2. 更新操作の遅延：

   - 特に status インデックスは、頻繁な更新により断片化が進む可能性があります。
   - 大量の注文を同時に更新する場合、インデックスの更新にかかる時間が無視できなくなります。

3. ストレージとメモリの使用量増加：

   - 5000 万件のデータに対して 4 つのインデックスを維持するため、ストレージ使用量が大幅に増加します。
   - データベースのキャッシュメモリも、これらのインデックスのために多く使用されます。

4. バックアップと復元の時間増加：
   - インデックスも含めてバックアップする必要があるため、バックアップと復元の時間が増加します。

対策：

1. 不要なインデックスの削除：例えば、total_amount のインデックスがあまり使用されていない場合、削除を検討。

2. 複合インデックスの使用：頻繁に一緒に使用される列の組み合わせで複合インデックスを作成。例：(customer_id, order_date)

3. 部分インデックス：特定の条件に合うデータのみにインデックスを作成。例：最近の注文のみにインデックスを作成。

```sql
CREATE INDEX idx_recent_orders ON orders(order_date) WHERE order_date > (CURRENT_DATE - INTERVAL '30 days');
```

4. バッチ処理の利用：大量の更新操作を小さなバッチに分割して実行。

5. 非同期のインデックス更新：可能であれば、一部のインデックスの更新を非同期で行う。

このようなシナリオでは、インデックスの利点（クエリの高速化）と欠点（書き込み性能の低下）のバランスを慎重に検討し、実際の使用パターンに基づいて最適化を行う必要があります。
