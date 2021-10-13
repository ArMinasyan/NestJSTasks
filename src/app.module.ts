import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from "./db";
import { UserModule } from "./user";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DbModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
