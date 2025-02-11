import { getProducts } from "../db/queries";

export const Table = async () => {
  const products = await getProducts();
  console.log(products);

  return (
    <div>Hello</div>
  )
}