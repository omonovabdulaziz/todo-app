import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma.service';

@Injectable()
export class TodosService {
    constructor(private prisma: PrismaService) {
    }

    async create(data: { title: string; description?: string; userId: number }) {
        return this.prisma.todo.create({data});
    }

    async findAll(userId: number) {
        return this.prisma.todo.findMany({where: {userId}});
    }

    async update(id: number, data: { title?: string; description?: string; completed?: boolean }) {
        return this.prisma.todo.update({where: {id}, data});
    }

    async delete(id: number) {
        return this.prisma.todo.delete({where: {id}});
    }
}
