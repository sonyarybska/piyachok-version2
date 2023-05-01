import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from './dto/response-user-dto';
import { ClientIdDto } from './dto/clientId-dto';
import { AuthAccessGuard } from '../auth/guards/auth-access.guard';
import { StatusEnum } from '../errors/status-enum';
import { MassageEnum } from '../errors/message-enum';
import { UpdateUserDto } from './dto/update-user-dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: StatusEnum.OK,
    description: 'All establishments',
    type: [ResponseUserDto],
  })
  @ApiBearerAuth()
  @UseGuards(AuthAccessGuard)
  async getAllUsers(@Res() res: Response) {
    const users = await this.userService.getAll();
    res.status(StatusEnum.OK).json(users);
  }

  @ApiResponse({
    status: StatusEnum.OK,
    description: 'One establishment',
    type: ResponseUserDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthAccessGuard)
  @Get('/:id')
  async getOne(@Param('id') id: number, @Res() res: Response) {
    const user = await this.userService.getOne(id);
    res.status(StatusEnum.OK).json(user);
  }

  @Post()
  @ApiResponse({
    status: StatusEnum.CREATED,
    description: MassageEnum.ADD_ITEM,
  })
  @ApiBody({ type: ClientIdDto, description: '`client_id`' })
  async postUser(@Req() req: any, @Res() res: Response) {
    const data = await this.userService.addUser(req.user.payload, res);

    return res.status(StatusEnum.CREATED).json(data);
  }

  @Put('/:id')
  @ApiResponse({
    status: StatusEnum.CREATED,
    description: MassageEnum.ADD_ITEM,
  })
  @ApiBearerAuth()
  @UseGuards(AuthAccessGuard)
  @ApiBody({ type: UpdateUserDto, description: 'Update user' })
  async putUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const data = await this.userService.putUser(id, updateUserDto);

    return res.status(StatusEnum.CREATED).json(data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthAccessGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') id: number, @Res() res: Response) {
    await this.userService.deleteUser(id);

    return res.status(StatusEnum.NO_CONTENT).json(MassageEnum.DELETE_ITEM);
  }
}
