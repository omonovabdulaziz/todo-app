import {Controller, Post, Body} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {LoginDto} from './dto/login.dto';
import {RegisterDTO} from "./dto/register.dto";
import {UsersService} from "../users/users.service";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    @ApiOperation({summary: 'Login user'})
    @ApiResponse({status: 200, description: 'User successfully logged in.'})
    @ApiResponse({status: 401, description: 'Invalid credentials.'})
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.email , loginDto.password);
    }

    @Post('register')
    @ApiOperation({summary: 'Register user'})
    @ApiResponse({status: 200, description: 'User successfully registered.'})
    @ApiResponse({status: 401, description: 'Invalid credentials.'})
    async register(@Body() registerDto: RegisterDTO) {
        return this.authService.register(registerDto.email, registerDto.password)
    }

}
