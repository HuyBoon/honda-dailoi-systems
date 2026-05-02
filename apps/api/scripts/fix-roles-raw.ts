import { Pool } from 'pg';
import 'dotenv/config';

const connectionString = process.env['DATABASE_URL'];
const pool = new Pool({ connectionString });

async function main() {
  console.log('Migrating existing USER roles to CUSTOMER using raw pg...');
  
  const client = await pool.connect();
  try {
    // 1. Check existing roles to see what we have
    const rolesCheck = await client.query('SELECT DISTINCT role::text FROM "User"');
    console.log('Current roles in database:', rolesCheck.rows);

    // 2. Perform the update
    const result = await client.query(
      `UPDATE "User" SET role = 'CUSTOMER' WHERE role::text = 'USER';`
    );
    
    console.log(`Updated ${result.rowCount} users.`);
  } finally {
    client.release();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
