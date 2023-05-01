import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Response } from 'express';
import { uuid } from 'uuidv4';

import { EstablishmentService } from './establishment.service';
import { PatchEstablishmentDto } from './dto/patch-establishment-dto';
import { ResponseEstablishmentDto } from './dto/response-establishment-dto';
import { StatusEnum } from '../errors/status-enum';
import { MassageEnum } from '../errors/message-enum';
import {
  CreateEstablishmentDto,
  DataEstablishmentDto,
} from './dto/create-establishment-dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PutEstablishmentDto } from './dto/put-establishment-dto';
import { AuthAccessGuard } from '../auth/guards/auth-access.guard';
import { EstablishmentQueryByUserIdDto } from './dto/establishment-query-by-user-id-dto';
import { EstablishmentQueryDto } from './dto/establishment-query-dto';

@ApiTags('Establishments')
@Controller('establishments')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Get()
  @ApiResponse({
    status: StatusEnum.OK,
    description: 'All establishments',
    type: [ResponseEstablishmentDto],
  })
  async getAllEstablishments(
    @Query() query: EstablishmentQueryDto,
    @Res() res: Response,
  ) {
    const establishments = await this.establishmentService.getAll(query);
    res.status(StatusEnum.OK).json(establishments);
  }

  @Get('users/:id')
  @ApiResponse({
    status: StatusEnum.OK,
    description: 'All establishments by user id',
    type: [ResponseEstablishmentDto],
  })
  @ApiBearerAuth()
  @UseGuards(AuthAccessGuard)
  async getAllEstablishmentsByUserId(
    @Query() query: EstablishmentQueryByUserIdDto,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    const establishments = await this.establishmentService.getAllByUserId(
      query,
      id,
    );
    res.status(StatusEnum.OK).json(establishments);
  }

  @ApiResponse({
    status: StatusEnum.OK,
    description: 'The found record',
    type: ResponseEstablishmentDto,
  })
  @Get(':id')
  async getOneEstablishment(@Param('id') id: number, @Res() res: Response) {
    const establishment = await this.establishmentService.getOne(id);
    res.status(StatusEnum.OK).json(establishment);
  }

  @ApiResponse({
    status: StatusEnum.OK,
    description: 'Establishment types',
  })
  @Get('/type/est')
  async getEstablishmentTypes(@Res() res: Response) {
    const types = await this.establishmentService.geEstablishmentTypes();
    res.status(StatusEnum.OK).json(types);
  }

  @ApiResponse({
    status: StatusEnum.CREATED,
    description: MassageEnum.ADD_ITEM,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Файл для завантаження',
    type: CreateEstablishmentDto,
  })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          const fileName = `${uuid()}${ext}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthAccessGuard)
  async postEstablishment(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createEstablishmentDto: CreateEstablishmentDto,
    @Res() res: Response,
  ) {
    try {
      const dataEstablishment = JSON.parse(createEstablishmentDto.data);

      const createObject = {
        ...dataEstablishment,
        user_id: +createEstablishmentDto.user_id,
        average_check: +dataEstablishment.average_check,
      };

      const objClass = plainToInstance(DataEstablishmentDto, createObject);

      const errors = await validate(objClass);

      if (errors.length > 0) {
        res.json(errors[0]);
      } else {
        await this.establishmentService.addEstablishment(createObject, files);
        res.status(StatusEnum.CREATED).json(MassageEnum.ADD_ITEM);
      }
    } catch (e) {
      res.json(e.message);
    }
  }

  @ApiResponse({
    status: StatusEnum.NO_CONTENT,
    description: MassageEnum.UPDATE_ITEM,
  })
  @ApiBearerAuth()
  @UseGuards(AuthAccessGuard)
  @Put('/:id')
  async putEstablishment(@Res() res: Response, @Req() req: any) {
    const objClass = plainToInstance(PutEstablishmentDto, {
      ...req.body,
      average_check: +req.body.average_check,
    });

    const errors = await validate(objClass);

    if (errors.length > 0) {
      res.json(errors[0]);
    } else {
      console.log(req.body);
      await this.establishmentService.putEstablishment(
        req.params.id,
        req.body,
        req.files,
        req.user_id,
      );
      res.status(StatusEnum.NO_CONTENT).json(MassageEnum.UPDATE_ITEM);
    }
  }

  @ApiResponse({
    status: StatusEnum.NO_CONTENT,
    description: MassageEnum.UPDATE_ITEM,
  })
  @Patch('/:id')
  async patchEstablishment(
    @Body() patchEstablishmentDto: PatchEstablishmentDto,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      await this.establishmentService.patchEstablishment(
        id,
        patchEstablishmentDto,
      );
      res.status(StatusEnum.NO_CONTENT).json(MassageEnum.UPDATE_ITEM);
    } catch (e) {
      res.json(e.message);
    }
  }

  @ApiResponse({
    status: StatusEnum.NO_CONTENT,
    description: MassageEnum.DELETE_ITEM,
  })
  @ApiBearerAuth()
  @UseGuards(AuthAccessGuard)
  @Delete('/:id')
  async deleteOneEstablishment(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.establishmentService.deleteEstablishment(id);
      res.status(StatusEnum.NO_CONTENT).json(MassageEnum.DELETE_ITEM);
    } catch (e) {
      res.json(e.message);
    }
  }
}
