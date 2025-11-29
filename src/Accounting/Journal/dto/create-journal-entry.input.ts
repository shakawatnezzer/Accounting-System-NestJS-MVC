import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsNumber, Min } from 'class-validator';

@InputType()
export class CreateJournalEntryInput {
  @Field()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @Field(() => Float)
  @IsNumber({}, { message: 'Debit must be a number' })
  @Min(0, { message: 'Debit cannot be negative' })
  debit: number;

  @Field(() => Float)
  @IsNumber({}, { message: 'Credit must be a number' })
  @Min(0, { message: 'Credit cannot be negative' })
  credit: number;

  @Field()
  @IsNotEmpty({ message: 'Account ID is required' })
  @IsMongoId({ message: 'Account must be a valid MongoDB ObjectId' })
  account: string;

  @Field({ nullable: true })
  date?: Date;
}
