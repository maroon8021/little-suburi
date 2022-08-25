import { ICommand } from '@nestjs/cqrs';

export class CreateTodoCommand implements ICommand {
  constructor(readonly userId: string, readonly content: string) {}
}
