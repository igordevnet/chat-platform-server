import { Body, Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { AuthMessage } from "src/shared/interfaces/messages/auth-message";
import { UserService } from "./user.service";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { ParseObjectIdPipe } from "@nestjs/mongoose";
import { Message } from "src/shared/interfaces/messages/message";
import { AuthGuard } from "src/shared/modules/auth/guards/auth.guard";

@Controller('users')
export class UserController{
    
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDTO): Promise<AuthMessage>{
        return this.userService.createUser(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateUser(@Param("id", ParseObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDTO): Promise<Message> {
        return this.userService.updateUser(id, updateUserDto);
    }
}