import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    databaseUrl: process.env.DATABASE_URL,
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});
