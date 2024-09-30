-- init.sql

-- ユーザー1の作成
CREATE USER user1 WITH PASSWORD 'password1';
-- ユーザー2の作成
CREATE USER user2 WITH PASSWORD 'password2';

-- 必要に応じてデータベースを作成し、ユーザーに権限を与える
GRANT ALL PRIVILEGES ON DATABASE "ts-db" TO user1;

GRANT ALL PRIVILEGES ON DATABASE "ts-db" TO user2;
