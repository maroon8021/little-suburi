import { Query } from '@nestjs-architects/typed-cqrs';
import { Todo } from 'src/infrastructure/entity/todo';

export class GetTodoListQuery extends Query<Todo[]> {
  constructor(readonly userId: string) {
    super();
  }
}
