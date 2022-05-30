import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    @MinLength(5)
    name: string;

    @IsNotEmpty()
    @MinLength(20)
    description: string;
}