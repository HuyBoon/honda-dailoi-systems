import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private readonly uploadPath = path.join(process.cwd(), 'uploads', 'thumbnails');

  constructor() {
    // Ensure directory exists
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async processAndSaveThumbnail(file: Express.Multer.File) {
    const fileName = `${uuidv4()}.webp`;
    const filePath = path.join(this.uploadPath, fileName);

    // Resize and convert to WebP for optimization
    await sharp(file.buffer)
      .resize(400, 400, {
        fit: 'cover',
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toFile(filePath);

    // Return the URL to be stored in the database
    // Assuming the app serves static files from /uploads
    return {
      url: `/uploads/thumbnails/${fileName}`,
      fileName: fileName,
    };
  }
}
