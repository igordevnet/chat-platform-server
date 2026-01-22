import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { AuthMessage } from "src/shared/messages/auth-message";
import { UserService } from "./user.service";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { ParseObjectIdPipe } from "@nestjs/mongoose";
import { Message } from "src/shared/messages/message";

@Controller('users')
export class UserController{
    
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDTO): Promise<AuthMessage>{
        return this.userService.createUser(createUserDto);
    }

    @Patch(':id')
    async updateUser(@Param("id", ParseObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDTO): Promise<Message> {
        return this.userService.updateUser(id, updateUserDto);
    }
}