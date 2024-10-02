import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
    @ApiProperty({
        description: 'The email of the user',
        example: 'user@example.com',
    })
    email!: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'securepassword123',
    })
    password!: string;
}
