import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './account.schema';
import { CreateAccountInput } from './dto/create-account.input';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  // Create account
  async create(input: CreateAccountInput): Promise<Account> {
    const exists = await this.accountModel.findOne({ code: input.code });

    if (exists) {
      throw new ConflictException('Account code already exists');
    }

    const account = new this.accountModel(input);
    return account.save();
  }

  // Get all accounts
  async findAll(): Promise<Account[]> {
    return this.accountModel.find().sort({ code: 1 });
  }

  // Find one account
  async findOne(id: string): Promise<Account | null> {
    return this.accountModel.findById(id);
  }
}
