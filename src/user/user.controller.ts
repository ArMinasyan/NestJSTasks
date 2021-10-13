import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { userDto } from "./user.dto";
import { AuthGuard } from "../auth";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUserInfo() {
    return this.userService.read();
  }

  @Get(":id")
  async getUserInfoById(
    @Param("id") id: number
  ) {
    return this.userService.readById(id);
  }

  @Post()
  async addUser(
    @Body() payload: userDto
  ) {
    return this.userService.create(payload);
  }

  @Put(":id")
  async updateUser(
    @Param("id") id: number,
    @Body() payload: userDto
  ) {
    return this.userService.update(id, payload);
  }

  @Delete(":id")
  async deleteUser(
    @Param("id") id: number
  ) {
    return this.userService.delete(id);
  }

}
