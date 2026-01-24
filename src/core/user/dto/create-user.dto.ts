import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDTO{
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;
}