import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userEntity } from "./entities";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "postgres",
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
