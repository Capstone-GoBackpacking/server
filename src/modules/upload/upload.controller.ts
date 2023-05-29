import {
  Controller,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { v4 } from 'uuid';
import { bucket } from 'firebase';
import * as dotenv from 'dotenv';
dotenv.config();

@Controller('upload')
export class UploadController {
  @Post('multiple/:folder')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param() params: any,
    @Res() response: any,
  ) {
    try {
      const { folder } = params;

      if (!files) {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'file not found' });
      }
      const responses = await Promise.all(
        files.map((file) => {
          const id = v4();
          const blob = bucket.file(folder + '/' + id + '_' + file.originalname);
          const blobWriter = blob.createWriteStream({
            metadata: {
              contentType: file.mimetype,
              metadata: {
                firebaseStorageDownloadTokens: id,
              },
            },
          });

          blobWriter.on('error', (error) => {
            response.status(HttpStatus.FORBIDDEN).json({
              message: error,
            });
          });

          blobWriter.end(file.buffer);

          const fileUrl =
            process.env.FIREBASE_DOMAIN +
            bucket.name +
            '/o/' +
            encodeURIComponent(blob.name) +
            '?alt=media&token=' +
            id;
          return {
            fileUrl,
            fileName: folder + '/' + id + '_' + file.originalname,
          };
        }),
      );
      console.log(responses);
      response.status(HttpStatus.OK).json(responses);
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'something went wrong!',
      });
    }
  }

  @Post(':folder')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param() params: any,
    @Res() response: any,
  ) {
    try {
      const { folder } = params;

      if (!file) {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'file not found' });
      }

      const id = v4();
      const blob = bucket.file(folder + '/' + id + '_' + file.originalname);
      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
          metadata: {
            firebaseStorageDownloadTokens: id,
          },
        },
      });

      blobWriter.on('error', (error) => {
        response.status(HttpStatus.FORBIDDEN).json({
          message: error,
        });
      });

      blobWriter.on('finish', () => {
        const fileUrl =
          process.env.FIREBASE_DOMAIN +
          bucket.name +
          '/o/' +
          encodeURIComponent(blob.name) +
          '?alt=media&token=' +
          id;
        response.status(HttpStatus.OK).json({
          fileUrl,
          fileName: folder + '/' + id + '_' + file.originalname,
        });
      });

      blobWriter.end(file.buffer);
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'something went wrong!',
      });
    }
  }
}
