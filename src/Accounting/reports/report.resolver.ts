import { Resolver, Query, Args } from '@nestjs/graphql';
import { ReportService } from './report.service';
import { LedgerInput } from './dto/ledger-input.dto';
import { LedgerEntryType } from './types/ledger-entry.type';
import { BalanceSheetType } from './types/balance-sheet.type';

@Resolver()
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Query(() => [LedgerEntryType])
  async ledger(@Args('input') input: LedgerInput) {
    return this.reportService.getLedger(input);
  }

  @Query(() => BalanceSheetType)
  async balanceSheet() {
    return this.reportService.getBalanceSheet();
  }
}
