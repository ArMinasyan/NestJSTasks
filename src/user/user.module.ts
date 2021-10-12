import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DbModule } from "../db";

@Module({
  imports: [DbModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {
}
