import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JournalEntry, JournalEntrySchema } from './journal-entry.schema';
import { JournalService } from './journal.service';
import { JournalResolver } from './journal.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: JournalEntry.name, schema: JournalEntrySchema }])
  ],
  providers: [JournalService, JournalResolver],
  exports: [JournalService],
})
export class JournalModule {}
