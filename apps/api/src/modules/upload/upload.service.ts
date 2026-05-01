import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
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

  async deleteFile(url: string) {
    if (!url || !url.startsWith('/uploads/')) return;

    try {
      // Remove the leading /uploads/ from the url to get the relative path
      const relativePath = url.replace(/^\/uploads\//, '');
      const filePath = path.join(process.cwd(), 'uploads', relativePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error(`Failed to delete file at ${url}:`, err);
    }
  }

  async getAllFiles() {
    try {
      if (!fs.existsSync(this.uploadPath)) return [];
      const files = fs.readdirSync(this.uploadPath);
      return files.map(file => ({
        name: file,
        url: `/uploads/thumbnails/${file}`,
        path: path.join(this.uploadPath, file),
        size: fs.statSync(path.join(this.uploadPath, file)).size,
        createdAt: fs.statSync(path.join(this.uploadPath, file)).birthtime,
      }));
    } catch (err) {
      console.error('Failed to list files:', err);
      return [];
    }
  }
}
