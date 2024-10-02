import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma.service';

@Injectable()
export class TodosService {
    constructor(private prisma: PrismaService) {
    }

    async create(data: { title: string; userId: number }) {

        if (!data.title) {
            throw new BadRequestException('Title is required and must be a string.');
        }

        const user = await this.prisma.user.findUnique({
            where: { id: data.userId },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${data.userId} not found.`);
        }

        return this.prisma.todo.create({
            data: {
                title: data.title,
                userId: data.userId,
            },
        });
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
