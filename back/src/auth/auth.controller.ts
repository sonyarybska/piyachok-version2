import { Controller, Req, Res, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRefreshGuard } from './guards/auth-refresh.guard';
import { StatusEnum } from '../errors/status-enum';
import { LoginUserDto } from '../user/dto/login-user-dto';
import { ResponseRefreshDto } from './dto/response-refresh-dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: StatusEnum.OK,
    description: 'User is login',
    type: [LoginUserDto],
  })
  @ApiQuery({
    name: 'email',
    required: true,
    type: String,
    description: 'Email of user',
  })
  @Get('login')
  async login(@Res() res: any, @Req() req: any) {
    try {
      const user = await this.authService.login(res, req);

      res.json(user);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  @ApiResponse({ type: ResponseRefreshDto })
  @ApiBearerAuth()
  @UseGuards(AuthRefreshGuard)
  @Get('refresh')
  async refresh(@Res() res: any, @Req() req: any) {
    try {
      const data = await this.authService.refresh(res, req);

      res.json(data);
    } catch (e) {
      console.log(e.message);
    }
  }

  @Get('logout')
  async logout(@Res() res, @Req() req) {
    try {
      await this.authService.logout(res, req);
      res.json('ok');
    } catch (e) {
      res.json(e.message);
    }
  }
}
