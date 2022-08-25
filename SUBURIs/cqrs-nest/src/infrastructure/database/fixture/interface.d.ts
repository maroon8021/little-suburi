import { EntityManager } from 'typeorm';

export abstract class Fixture {
  abstract run(manager: EntityManager): Promise<void>;
}
