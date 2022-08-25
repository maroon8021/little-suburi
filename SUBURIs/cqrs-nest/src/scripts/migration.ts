import { databaseProvider } from 'src/infrastructure/database';

const isLocal = process.env.IS_LOCAL === 'true';

export const handler = async () => {
  const dataSource = await databaseProvider.useFactory();
  await dataSource.runMigrations({ transaction: 'all' });
};

if (isLocal) {
  // eslint-disable-next-line @typescript-eslint/no-extra-semi
  (async () => {
    try {
      await handler();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      process.exit(1);
    }
  })();
}
