import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Request,
    UseGuards
} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard/jwt-auth.guard';
import {TodosService} from './todos.service';
import {CustomRequest} from '../types/custom-request';
import {CreateTodoDto} from './dto/create.dto';
import {UpdateTodoDto} from './dto/update.dto';
import {Todo} from '../types/todo';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() createTodoDto: CreateTodoDto,
        @Request() req: CustomRequest
    ): Promise<Todo> { // Specify the return type
        return this.todosService.create({ ...createTodoDto, userId: req.user.id });
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Request() req: CustomRequest): Promise<Todo[]> { // Specify the return type
        return this.todosService.findAll(req.user.id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id') id: string,
        @Body() updateTodoDto: UpdateTodoDto
    ): Promise<Todo> { // Specify the return type
        return this.todosService.update(+id, updateTodoDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> { // Specify the return type
        await this.todosService.delete(+id);
    }
}
