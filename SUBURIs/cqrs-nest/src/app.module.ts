import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandler } from './application/command';
import { QueryHandlers } from './application/query';
import { databaseProvider } from './infrastructure/database';
import { TodoController } from './interface/controller/todo.controller';

@Module({
  imports: [CqrsModule],
  controllers: [TodoController],
  providers: [databaseProvider, ...QueryHandlers, ...CommandHandler],
})
export class AppModule {}
