import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../entities/user.entity";

export class UserRepository {
    public constructor(@InjectModel("User") private readonly userModel: Model<User>) {}
}