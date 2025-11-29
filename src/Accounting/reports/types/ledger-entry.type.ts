import { ObjectType, Field, Float, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class LedgerEntryType {
  @Field(() => GraphQLISODateTime)
  date: Date;

  @Field()
  description: string;

  @Field(() => Float)
  debit: number;

  @Field(() => Float)
  credit: number;

  @Field(() => Float)
  balance: number;

  // account info (populated if available)
  @Field({ nullable: true })
  accountId?: string;

  @Field({ nullable: true })
  accountName?: string;
}
