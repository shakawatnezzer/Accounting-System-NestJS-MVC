import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class BalanceSheetAccount {
  @Field()
  accountId: string;

  @Field()
  name: string;

  @Field(() => Float)
  balance: number;
}

@ObjectType()
export class BalanceSheetType {
  @Field(() => [BalanceSheetAccount])
  assets: BalanceSheetAccount[];

  @Field(() => [BalanceSheetAccount])
  liabilities: BalanceSheetAccount[];

  @Field(() => [BalanceSheetAccount])
  equity: BalanceSheetAccount[];

  @Field(() => Float)
  totalAssets: number;

  @Field(() => Float)
  totalLiabilities: number;

  @Field(() => Float)
  totalEquity: number;
}
