import { Query } from '@nestjs-architects/typed-cqrs';
import { Todo } from 'src/infrastructure/entity/todo';

export class GetTodoQuery extends Query<Todo> {
  constructor(readonly id: string) {
    super();
  }
}
