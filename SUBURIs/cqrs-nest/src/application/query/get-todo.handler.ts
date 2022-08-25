import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Todo } from 'src/infrastructure/entity/todo';
import { Repository } from 'typeorm';

import { GetTodoQuery } from './get-todo.query';

@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler<GetTodoQuery> {
  constructor(
    @Inject('DATA_SOURCE') private readonly todoRepository: Repository<Todo>,
  ) {}

  async execute(query: GetTodoQuery): Promise<Todo> {
    const { id } = query;
    return this.todoRepository.findOneByOrFail({ id });
  }
}
