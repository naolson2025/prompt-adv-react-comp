
import { Container } from '../components/container';
import { getTransactions } from '../db/queries';

export default async function Home() {
  const transactions = await getTransactions('02', '2024');
  console.log('Transactions:', transactions);

  return (
    <Container>
      Hello
    </Container>
  );
}
