import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {TodosModule} from './todos/todos.module';
import {UsersModule} from './users/users.module';
import {PrismaService} from './prisma.service';

@Module({
    imports: [AuthModule, TodosModule, UsersModule],
    providers: [PrismaService],
})
export class AppModule {
}