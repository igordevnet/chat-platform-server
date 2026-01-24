import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { GetUserDTO } from '../dto/get-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) { }

  async createUser(createUserDto: CreateUserDTO): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDTO): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<GetUserDTO | null> {
    const user = await this.userModel.findById(id).lean().exec();
    if (!user) return null;

    return user as GetUserDTO;
  }
}
