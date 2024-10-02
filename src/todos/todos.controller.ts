import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    Request,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard/jwt-auth.guard';
import {TodosService} from './todos.service';
import {CustomRequest} from '../types/custom-request';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
    constructor(private readonly todosService: TodosService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() createTodoDto: { title: string; description?: string },
        @Request() req: CustomRequest
    ): Promise<any> {
        return this.todosService.create({...createTodoDto, userId: req.user.id});
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Request() req: CustomRequest): Promise<any> {
        return this.todosService.findAll(req.user.id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id') id: string,
        @Body() updateTodoDto: { title?: string; description?: string; completed?: boolean }
    ): Promise<any> {
        return this.todosService.update(+id, updateTodoDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<any> {
        return this.todosService.delete(+id);
    }
}
