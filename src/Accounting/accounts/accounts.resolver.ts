import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { CreateAccountInput } from './dto/create-account.input';
import { AccountType } from './account.type';

@Resolver(() => AccountType)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Mutation(() => AccountType)
  async createAccount(@Args('input') input: CreateAccountInput) {
    return this.accountsService.create(input);
  }

  @Query(() => [AccountType])
  async accounts() {
    return this.accountsService.findAll();
  }

  @Query(() => AccountType, { nullable: true })
  async account(@Args('id') id: string) {
    return this.accountsService.findOne(id);
  }
}
