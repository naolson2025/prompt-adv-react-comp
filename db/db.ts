import Database, { Database as DatabaseType } from 'better-sqlite3';
import path from 'path';
import { faker } from '@faker-js/faker';

const dbPath = path.join(process.cwd(), 'products.sqlite'); // Store in project root

const makeRow = () => ({
  name: faker.commerce.productName(),
  department: faker.commerce.department(),
  isbn: faker.commerce.isbn(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
});

let db: DatabaseType;

export async function getDbConnection(): Promise<DatabaseType> {
  if (!db) {
    try {
      db = new Database(dbPath);
      db.pragma('journal_mode = WAL');

      // Check if tables exist. If not create them.
      db.exec(`
        CREATE TABLE IF NOT EXISTS Products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            department TEXT NOT NULL,
            isbn TEXT NOT NULL,
            description TEXT NOT NULL,
            price TEXT NOT NULL
        );
      `);

      // check if products exist. If not, insert some
      const products = db
        .prepare('SELECT COUNT(*) as count FROM Products')
        .get() as { count: number };

      if (products.count === 0) {
        const insert = db.prepare(
          'INSERT INTO Products (name, department, isbn, description, price) VALUES (@name, @department, @isbn, @description, @price)'
        );
        for (let i = 0; i < 1_000_000; i++) {
          const row = makeRow();
          insert.run(row);
        }
      }

      console.log('Database initialized successfully.');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error; // Important: Re-throw the error to prevent the app from starting
    }
  }

  return db;
}
