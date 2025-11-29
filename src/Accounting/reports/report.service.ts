import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LedgerInput } from './dto/ledger-input.dto';
import { Account, AccountDocument } from '../accounts/account.schema';
import { JournalEntry, JournalEntryDocument } from '../Journal/journal-entry.schema';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(JournalEntry.name) private journalModel: Model<JournalEntryDocument>,
  ) {}

  // Ledger
  async getLedger(input: LedgerInput) {
    const { accountId, startDate, endDate } = input;

    const filter: any = { account: accountId };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = startDate;
      if (endDate) filter.date.$lte = endDate;
    }

    const entries = await this.journalModel
      .find(filter)
      .sort({ date: 1 })
      .populate('account', 'name')
      .lean();

    let runningBalance = 0;
    return entries.map((entry: any) => {
      runningBalance += (entry.debit || 0) - (entry.credit || 0);

      return {
        date: entry.date,
        description: entry.description,
        debit: entry.debit || 0,
        credit: entry.credit || 0,
        balance: runningBalance,
        accountId: entry.account ? String(entry.account._id) : accountId,
        accountName: entry.account ? entry.account.name : undefined,
      };
    });
  }

  // Balance Sheet
  async getBalanceSheet() {
    const accounts = await this.accountModel.find().lean();
    const journals = await this.journalModel.find().lean();

    const ledgerMap: Record<string, number> = {};
    for (const entry of journals) {
      const acctId = String(entry.account);
      if (!ledgerMap[acctId]) ledgerMap[acctId] = 0;
      ledgerMap[acctId] += (entry.debit || 0) - (entry.credit || 0);
    }

    const result = {
      assets: [] as { accountId: string; name: string; balance: number }[],
      liabilities: [] as { accountId: string; name: string; balance: number }[],
      equity: [] as { accountId: string; name: string; balance: number }[],
      totalAssets: 0,
      totalLiabilities: 0,
      totalEquity: 0,
    };

    for (const acct of accounts) {
      const id = String(acct._id);
      const balance = ledgerMap[id] ?? 0;

      if (acct.type === 'ASSET') {
        result.assets.push({ accountId: id, name: acct.name, balance });
        result.totalAssets += balance;
      } else if (acct.type === 'LIABILITY') {
        result.liabilities.push({ accountId: id, name: acct.name, balance });
        result.totalLiabilities += balance;
      } else if (acct.type === 'EQUITY') {
        result.equity.push({ accountId: id, name: acct.name, balance });
        result.totalEquity += balance;
      }
    }

    return result;
  }
}
