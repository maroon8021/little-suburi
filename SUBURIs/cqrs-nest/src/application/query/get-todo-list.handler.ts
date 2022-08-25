import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Todo } from 'src/infrastructure/entity/todo';
import { Repository } from 'typeorm';

import { GetTodoListQuery } from './get-todo-list.query';

@QueryHandler(GetTodoListQuery)
export class GetTodoListHandler
  implements IQueryHandler<GetTodoListQuery, Todo[]>
{
  constructor(
    @Inject('DATA_SOURCE') private readonly todoRepository: Repository<Todo>,
  ) {}

  async execute(query: GetTodoListQuery): Promise<Todo[]> {
    const { userId } = query;
    return this.todoRepository.find({
      where: {
        userId,
      },
    });
  }
}
