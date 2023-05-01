import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from './response-user-dto';

class TokensDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class LoginUserDto {
  @ApiProperty({ type: () => ResponseUserDto })
  user: ResponseUserDto;

  @ApiProperty({ type: () => TokensDto })
  tokens: TokensDto;
}
