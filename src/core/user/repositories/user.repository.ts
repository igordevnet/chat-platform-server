import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';

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

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
