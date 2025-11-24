import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './user.type';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => UserType) // ✅ specify type here
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserType)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @Query(() => [UserType]) // ✅ add at least one query for root type
  async users() {
    return this.usersService.findAll();
  }
}
