import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Create user
  async create(createUserInput: CreateUserInput): Promise<User> {
    const existing = await this.userModel.findOne({ email: createUserInput.email });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

    const user = new this.userModel({
      ...createUserInput,
      password: hashedPassword,
    });

    return user.save();
  }

  // Find a user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  // ✅ Find all users (needed for users query)
  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }
}
