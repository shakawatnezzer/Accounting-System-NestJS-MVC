import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './Accounting/accounts/accounts.module';
import { JournalModule } from './Accounting/Journal/journal.module';
import { ReportModule } from './Accounting/reports/report.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    UsersModule,
    AuthModule,
    AccountsModule,
    JournalModule,
    ReportModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,     
      path: '/graphql',     
      sortSchema: true,
      context: ({ req }) => ({ req }), 
      
    }),
  ],
})
export class AppModule {}
