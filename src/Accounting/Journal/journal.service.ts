import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JournalEntry, JournalEntryDocument } from './journal-entry.schema';
import { CreateJournalEntryInput } from './dto/create-journal-entry.input';

@Injectable()
export class JournalService {
  constructor(
    @InjectModel(JournalEntry.name) private journalModel: Model<JournalEntryDocument>,
  ) {}

  async create(input: CreateJournalEntryInput): Promise<JournalEntry> {
    const entry = new this.journalModel(input);
    return entry.save();
  }

  async findAll(): Promise<JournalEntry[]> {
    return this.journalModel.find().sort({ date: 1 }).populate('account');
  }

  async findByAccount(accountId: string): Promise<JournalEntry[]> {
    return this.journalModel.find({ account: accountId }).sort({ date: 1 });
  }
}
