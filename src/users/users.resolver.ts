import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './user.type';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserType)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @Query(() => [UserType])
  async users() {
    return this.usersService.findAll();
  }

  // 🔐 PROTECTED QUERY
  @Query(() => UserType)
  @UseGuards(GqlAuthGuard)
  async me(@Context() ctx) {
    const user = ctx.req.user; // { userId, email, role }

    return this.usersService.findByEmail(user.email);
  }
}
