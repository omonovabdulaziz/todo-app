import {ApiProperty} from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        description: 'The email of the user',
        example: 'user@example.com',
    })
    email!: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'P@ssw0rd123',
    })
    password!: string;

}
