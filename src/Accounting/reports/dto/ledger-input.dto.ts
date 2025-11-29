import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

@InputType()
export class LedgerInput {
  @Field()
  @IsNotEmpty()
  @IsMongoId()
  accountId: string;

  @Field({ nullable: true })
  @IsOptional()
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  endDate?: Date;
}
