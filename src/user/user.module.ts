import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DbModule } from "../db";
import { AuthModule } from "../auth";

@Module({
  imports: [DbModule, AuthModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {
}
