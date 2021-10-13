import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userEntity } from "./entities";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [userEntity],
      synchronize: true
    }),

    TypeOrmModule.forFeature([userEntity])
  ],
  exports: [
    TypeOrmModule
  ]
})
export class DbModule {
}
