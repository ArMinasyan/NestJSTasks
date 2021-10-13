import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { userEntity } from "../db/entities";
import { Repository } from "typeorm";
import { signInDto } from "./auth.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(userEntity) private readonly userRepo: Repository<userEntity>,
    private readonly jwtService: JwtService
  ) {
  }

  async userSignIn(payload: signInDto): Promise<{ message: string, data: {} }> {
    const user = await this.userRepo.findOne({
      where: {
        username: payload.username
      }
    });

    if (user && bcrypt.compareSync(payload.password, user.password)) {
      const token = this.jwtService.sign({
        id: user.id,
        isAdmin: user.isAdmin,
        username: user.username
      });

      return {
        message: "Success",
        data: {
          token: token
        }
      };
    }

    return {
      message: "Incorrect username or password",
      data: {}
    };
  }
}
