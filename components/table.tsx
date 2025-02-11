import { getDbConnection } from "../db/db";

export const Table = async () => {
  const db = await getDbConnection();

  return (
    <div>Hello</div>
  )
}