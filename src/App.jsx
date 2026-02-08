import MainLayout from './components/layouts/MainLayout';
import Balance from './components/Balance';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

const App = () => {
  return (
    <MainLayout>
      <Balance />
      <TransactionForm />
      <TransactionList />
    </MainLayout>
  );
};

export default App;
