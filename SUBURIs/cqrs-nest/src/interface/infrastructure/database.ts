import { DataSource } from 'typeorm';

const {
  DB_MIGRATION,
  DB_HOSTNAME,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  IS_INSERT_FIXTURE,
  NODE_ENV,
} = process.env;

const isDbMigration = DB_MIGRATION === 'true';
const isInsertFixture = IS_INSERT_FIXTURE === 'true';
const isTest = NODE_ENV === 'test';

const useTSFiles = isDbMigration || isInsertFixture || isTest;

export const databaseProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      entities: useTSFiles
        ? ['./src/interface/entity/*.*']
        : ['./dist/interface/entity/*.*'],
      migrations: isDbMigration
        ? ['./src/interface/databases/migrations/*.ts']
        : [],
      logging: true,

      host: DB_HOSTNAME,
      port: Number(DB_PORT || '5432'),
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    return dataSource.initialize();
  },
};
