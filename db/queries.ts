import { getDbConnection } from './db';

export type Transaction = {
  id: number;
  amount: string;
  category: string;
  description: string;
  merchant: string;
  date: string;
};

export const getTransactions = async (
  month = '01',
  year = '2024'
): Promise<Transaction[]> => {
  const db = await getDbConnection();

  const transactions = db
    .prepare(
      "SELECT * FROM Transactions WHERE strftime('%m', date) = @month AND strftime('%Y', date) = @year ORDER BY date DESC"
    )
    .all({ month, year });

  return transactions as Transaction[];
};
