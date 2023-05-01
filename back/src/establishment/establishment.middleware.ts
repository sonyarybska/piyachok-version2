import { Injectable, NestMiddleware } from '@nestjs/common';
import * as fs from 'fs/promises';
import { join } from 'path';
import * as multer from 'multer';
import { PutEstablishmentDto } from './dto/put-establishment-dto';

@Injectable()
export class EstablishmentMiddleware implements NestMiddleware {
  private upload = multer();

  use(req: any, res: any, next: () => void) {
    this.upload.any()(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: 'Помилка завантаження файлів.',
          error: err.message,
        });
      }

      if (req.files && req.files.length) {
        const { user_id } = req.body;
        const { id } = req.params;

        const filePath = join(
          __dirname,
          '..',
          '..',
          'uploads',
          'users',
          user_id.toString(),
          'establishments_photo',
          id.toString(),
        );

        const data = await fs.readdir(filePath);

        data.map((value) => fs.unlink(join(filePath, value)));
      }

      const body = JSON.parse(req.body.data);
      req.user_id = body.user_id;

      const {
        end_work,
        start_work,
        type,
        average_check,
        tags,
        title,
        phone,
        location,
      } = body as PutEstablishmentDto;

      req.body = {
        end_work,
        start_work,
        type,
        average_check,
        tags,
        title,
        phone,
        location,
      };

      next();
    });
  }
}
