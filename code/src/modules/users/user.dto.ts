/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from "class-validator";

export class UserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    senha: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(1)
    idNivel: string;
}