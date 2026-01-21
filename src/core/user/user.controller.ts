import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { AuthMessage } from "src/shared/messages/auth-message";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{
    
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDTO): Promise<AuthMessage>{
        return this.userService.createUser(createUserDto);
    }
}