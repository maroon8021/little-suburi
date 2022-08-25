import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Todo } from 'src/infrastructure/entity/todo';
import { Repository } from 'typeorm';
import { CreateTodoCommand } from './create-todo.command';

@CommandHandler(CreateTodoCommand)
export class CreateTodotHandler
  implements ICommandHandler<CreateTodoCommand, void>
{
  constructor(
    @Inject('DATA_SOURCE') private readonly todoRepository: Repository<Todo>,
  ) {}

  async execute({ userId, content }: CreateTodoCommand): Promise<void> {
    await this.todoRepository.save({ userId, content });
  }
}
