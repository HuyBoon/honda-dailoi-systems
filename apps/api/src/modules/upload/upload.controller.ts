import {
  Controller,
  Post,
  Get,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { UploadService } from './upload.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Upload')
@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('thumbnail')
  @ApiOperation({ summary: 'Upload and resize part thumbnail' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB limit
      },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new BadRequestException('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadThumbnail(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.uploadService.processAndSaveThumbnail(file);
  }

  @Get()
  @ApiOperation({ summary: 'List all uploaded files' })
  async listFiles() {
    return this.uploadService.getAllFiles();
  }

  @Delete('file')
  @ApiOperation({ summary: 'Delete a file by URL' })
  async deleteFile(@Query('url') url: string) {
    if (!url) {
      throw new BadRequestException('URL is required');
    }
    await this.uploadService.deleteFile(url);
    return { message: 'File deleted successfully' };
  }
}
