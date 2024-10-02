import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {TodosModule} from './todos/todos.module';
import {UsersModule} from './users/users.module';
import {PrismaService} from './prisma.service';
import { SessionsModule } from './sessions/sessions.module';

@Module({
    imports: [AuthModule, TodosModule, UsersModule, SessionsModule],
    providers: [PrismaService],
})
export class AppModule {
}