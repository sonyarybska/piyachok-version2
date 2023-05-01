import { Injectable } from '@nestjs/common';
import { join, extname } from 'path';
import * as fs from 'fs/promises';
import * as fse from 'fs-extra';
import { Establishment } from '../models/establishment.model';
import { InjectModel } from '@nestjs/sequelize';
import { uuid } from 'uuidv4';

@Injectable()
export class FileUploadHelper {
  constructor(
    @InjectModel(Establishment)
    private readonly establishmentRepository: typeof Establishment,
  ) {}

  async postEstablishmentPhotos(establishment, files) {
    if (establishment) {
      const pathWithoutStatic = join(
        'uploads',
        'users',
        establishment.user_id.toString(),
        'establishments_photo',
        establishment.establishment_id.toString(),
      );

      const uploadPath = join(process.cwd(), pathWithoutStatic);

      const isExist = await fse.pathExists(uploadPath);

      if (!isExist) {
        await fs.mkdir(uploadPath, { recursive: true });
      }

      await Promise.all(
        files.map(async (file, index) => {
          await fs.rename(
            file.path,
            join(uploadPath, `${index}_${file.filename}`),
          );
        }),
      );

      const photos = await fse.readdir(uploadPath).catch((e) => console.log(e));
      const urls = photos.map((photo) => join(pathWithoutStatic, photo));
      await this.establishmentRepository.update(
        { avatar: urls[0] },
        { where: { establishment_id: establishment.establishment_id } },
      );
      await this.establishmentRepository.update(
        { photos: urls },
        { where: { establishment_id: establishment.establishment_id } },
      );
    } else {
      await Promise.all(
        files.map((file) => {
          fs.rm(join(process.cwd(), 'uploads', file.filename));
        }),
      );
      return false;
    }
  }

  async updateEstablishmentPhotos(establishment_id, user_id, files) {
    try {
      if (establishment_id) {
        const pathWithoutStatic = join(
          'uploads',
          'users',
          user_id.toString(),
          'establishments_photo',
          establishment_id.toString(),
        );

        const uploadPath = join(process.cwd(), pathWithoutStatic);

        const isExist = await fse.pathExists(uploadPath);

        if (!isExist) {
          await fs.mkdir(uploadPath, { recursive: true });
        }

        await Promise.all(
          files.map(async (file, index) => {
            const extension = extname(file.originalname);
            await fs.writeFile(
              join(uploadPath, `${index}_${uuid()}${extension}`),
              file.buffer,
            );
          }),
        );

        const photos = await fs.readdir(uploadPath);

        const urls = await Promise.all(
          photos.map((value) => join(pathWithoutStatic, value)),
        );

        await this.establishmentRepository.update(
          { avatar: urls[0] },
          { where: { establishment_id } },
        );
        const updated = await this.establishmentRepository.update(
          { photos: urls },
          { where: { establishment_id }, returning: true },
        );

        return updated[1];
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async deletePhotoByUserId(user_id) {
    const deletePath = join(
      process.cwd(),
      'uploads',
      'users',
      user_id.toString(),
    );

    await fs.rm(deletePath, { recursive: true, force: true });
  }

  async deletePhotoByEstId(establishment_id) {
    const deletePath = join(process.cwd(), 'uploads', 'users');

    const users = await fs.readdir(deletePath);

    users.map(async (user) => {
      const usersEstablishments = await fs.readdir(
        join(deletePath, user, 'establishments_photo'),
      );

      for (const item of usersEstablishments) {
        if (item === establishment_id) {
          await fs.rm(join(deletePath, user, 'establishments_photo', item), {
            recursive: true,
            force: true,
          });
        }
      }
    });
  }
}
