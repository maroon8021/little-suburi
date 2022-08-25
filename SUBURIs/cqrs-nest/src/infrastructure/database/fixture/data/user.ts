import { User } from 'src/infrastructure/entity/user';
import { EntityManager } from 'typeorm';
import { Fixture } from '../interface';

export class UserFixture implements Fixture {
  async run(manager: EntityManager): Promise<void> {
    await manager.getRepository(User).save([
      {
        name: 'sample1',
        emailaddress: 'hoge@com',
        password: 'password',
      },
    ]);
  }
}
