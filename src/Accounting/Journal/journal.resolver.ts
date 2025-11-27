import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { JournalService } from './journal.service';
import { CreateJournalEntryInput } from './dto/create-journal-entry.input';
import { JournalEntryType } from './journal-entry.type';

@Resolver(() => JournalEntryType)
export class JournalResolver {
  constructor(private readonly journalService: JournalService) {}

  @Mutation(() => JournalEntryType)
  async createJournalEntry(@Args('input') input: CreateJournalEntryInput) {
    return this.journalService.create(input);
  }

  @Query(() => [JournalEntryType])
  async journalEntries() {
    return this.journalService.findAll();
  }

  @Query(() => [JournalEntryType])
  async journalEntriesByAccount(@Args('accountId') accountId: string) {
    return this.journalService.findByAccount(accountId);
  }
}
