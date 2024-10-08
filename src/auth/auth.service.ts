import {Injectable, ConflictException, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        console.log(user);

        const isPasswordValid = user && await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)
        if (isPasswordValid) {
            const { password, ...result } = user; // Exclude the password from the result
            return result; // Return the user details without the password
        }

        throw new UnauthorizedException('Password or email incorrect'); // Throw an exception if the password is incorrect
    }

    async login(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.validateUser(email, password);
        const payload = {email: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(email: string, password: string) {
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.userService.create(email, hashedPassword);

        const payload = {email: newUser.email, sub: newUser.id};
        const token = this.jwtService.sign(payload);

        return {
            id: newUser.id,
            email: newUser.email,
            access_token: token,
        };
    }
}
