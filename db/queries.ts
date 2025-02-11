import { getDbConnection } from "./db";

type Product = {
  id: number;
  name: string;
  department: string;
  isbn: string;
  description: string;
  price: string;
};

export const getProducts = async (limit = 100): Promise<Product[]> => {
  const db = await getDbConnection();
  const products = db.prepare('SELECT * FROM Products LIMIT ?').all(limit);
  return products as Product[];
}