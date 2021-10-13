import { Body, Controller, Inject, Post } from "@nestjs/common";
import { signInDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { AuthDiToken } from "./auth.di";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: AuthService
  ) {
  }

  @Post()
  async signIn(@Body() payload: signInDto) {
    return this.authService.userSignIn(payload);
  }
}
