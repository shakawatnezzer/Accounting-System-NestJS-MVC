import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportResolver } from './report.resolver';
import { ReportService } from './report.service';

import { Account, AccountSchema } from '../accounts/account.schema';
import { JournalEntry, JournalEntrySchema } from '../Journal/journal-entry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: JournalEntry.name, schema: JournalEntrySchema },
    ]),
  ],
  providers: [ReportResolver, ReportService],
  exports: [ReportService],
})
export class ReportModule {}
