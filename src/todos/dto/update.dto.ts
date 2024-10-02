import {IsOptional, IsString, IsBoolean} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateTodoDto {
    @ApiProperty({
        description: 'title',
        example: 'title'
    })
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'description',
        example: 'description'
    })
    description?: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        description: 'completed',
        example: true
    })
    completed?: boolean;
}
