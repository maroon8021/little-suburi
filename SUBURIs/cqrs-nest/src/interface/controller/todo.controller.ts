import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';
import { CreateTodoCommand } from 'src/application/command/create-todo.command';
import { GetTodoListQuery } from 'src/application/query/get-todo-list.query';
import { GetTodoQuery } from 'src/application/query/get-todo.query';
import { TodoResponse } from './todo.dto';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list/:userId')
  @ApiResponse({
    status: 200,
    type: Array<TodoResponse>,
  })
  async getTodoList(@Param() userId: string): Promise<TodoResponse[]> {
    const todoList = await this.queryBus.execute(new GetTodoListQuery(userId));
    return todoList.map(({ id, content, isCompleted, createdAt }) => ({
      id,
      content,
      isCompleted,
      createdAt,
    }));
  }

  @Get(':id')
  async getTodo(@Param() id: string) {
    const { content, isCompleted, createdAt } = await this.queryBus.execute(
      new GetTodoQuery(id),
    );
    return {
      id,
      content,
      isCompleted,
      createdAt,
    };
  }

  @Post(':userId')
  async createTodo(@Param() userId: string, @Body() content: string) {
    await this.commandBus.execute(new CreateTodoCommand(userId, content));
  }

  // @Delete(':id')
  // async deleteTodo() {}

  // @Patch(':id')
  // async updateTodo() {}
}
