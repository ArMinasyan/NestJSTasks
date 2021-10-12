import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { userEntity } from "../db/entities";
import { Repository } from "typeorm";
import { userDto } from "./user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(userEntity) private readonly userRepo: Repository<userEntity>
  ) {
  }

  public async read(): Promise<{ data: userEntity[]; message: string }> {
    try {
      const data = await this.userRepo.find();

      return {
        message: "",
        data: data
      };
    } catch (err) {
      throw err;
    }

  }

  public async readById(id: number): Promise<{ data: userEntity[]; message: string }> {
    try {
      const data = await this.userRepo.findByIds([id]);

      return {
        message: "",
        data: data
      };
    } catch (err) {
      throw err;
    }

  }

  public async create(payload: userDto): Promise<{ data: userEntity[]; message: string }> {
    try {
      const isExist = await this.userRepo.findOne({
        where: {
          username: payload.username
        }
      });

      if (isExist && isExist.id) {
        return {
          message: "User already registered",
          data: []
        };
      }

      payload.password = bcrypt.hashSync(payload.password, 10);

      const data = await this.userRepo.save(payload);
      return {
        message: "Success",
        data: [data]
      };
    } catch (err) {
      throw err;
    }
  }

  public async update(id: number, payload: userDto): Promise<{ data: userEntity[]; message: string }> {
    try {
      const isExist = await this.userRepo.query(`
          SELECT *
          FROM users
          WHERE username = $1
            AND "deletedAt" IS NULL
      `, [payload.username]);

      if (isExist && isExist.length > 0) {
        return {
          message: "Username already exist",
          data: []
        };
      }

      payload.password = bcrypt.hashSync(payload.password, 10);
      const data = await this.userRepo.update({ id }, payload);
      if (data && data.affected > 0) {
        return {
          message: "Updated",
          data: []
        };
      }

      return {
        message: "Data not updated",
        data: []
      };
    } catch (err) {
      throw err;
    }
  }

  public async delete(id: number): Promise<{ data: userEntity[]; message: string }> {
    try {
      await this.userRepo.softDelete({ id });
      return {
        message: "Deleted",
        data: []
      };
    } catch (err) {
      throw err;
    }
  }
}
