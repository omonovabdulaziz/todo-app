import {IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateTodoDto {

    @ApiProperty({
        description:'title',
        example:'title'
    })
    @IsString()
    title!: string;

    @ApiProperty({
        description:'description',
        example:'description'
    })
    @IsString()
    description!: string;
}
