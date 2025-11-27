import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';

@InputType()
export class CreateJournalEntryInput {
  @Field()
  @IsNotEmpty()
  description: string;

  @Field(() => Float)
  @IsNumber()
  debit: number;

  @Field(() => Float)
  @IsNumber()
  credit: number;

  @Field()
  @IsMongoId()
  account: string;

  @Field({ nullable: true })
  date?: Date;
}
