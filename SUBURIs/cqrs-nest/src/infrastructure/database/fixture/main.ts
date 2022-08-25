import { databaseProvider } from 'src/infrastructure/database';
import { UserFixture } from './data/user';
import { Fixture } from './interface';

// 以下のarrayに実行用のfixtureのclassを追加してください
const fixtureLists: Fixture[] = [new UserFixture()];

(async () => {
  const dataSource = await databaseProvider.useFactory();

  try {
    await dataSource.transaction(async (manager) => {
      for (const fixture of fixtureLists) {
        await fixture.run(manager);
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
})();
