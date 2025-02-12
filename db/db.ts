import Database, { Database as DatabaseType } from 'better-sqlite3';
import path from 'path';
import { faker } from '@faker-js/faker';

const dbPath = path.join(process.cwd(), 'transactions.sqlite'); // Store in project root

const makeRow = () => ({
  amount: faker.finance.amount(),
  category: faker.commerce.department(),
  description: faker.commerce.productDescription(),
  merchant: faker.company.name(),
  date: faker.date.past({ years: 2 }).toISOString(),
})

let db: DatabaseType;

export async function getDbConnection(): Promise<DatabaseType> {
  if (!db) {
    try {
      db = new Database(dbPath);
      db.pragma('journal_mode = WAL');

      // Check if tables exist. If not create them.
      db.exec(`
        CREATE TABLE IF NOT EXISTS Transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT NOT NULL,
            merchant TEXT NOT NULL,
            date TEXT NOT NULL
        );
      `);

      // check if transactions exist. If not, insert some
      const transactions = db
        .prepare('SELECT COUNT(*) as count FROM Transactions')
        .get() as { count: number };

      if (transactions.count === 0) {
        const insert = db.prepare(
          'INSERT INTO Transactions (amount, category, description, merchant, date) VALUES (@amount, @category, @description, @merchant, @date)',
        );
        for (let i = 0; i < 5_000; i++) {
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
