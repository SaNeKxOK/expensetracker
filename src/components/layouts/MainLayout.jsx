import { Wallet } from 'lucide-react';
import PropTypes from 'prop-types';
import DataMigration from '../DataMigration';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg flex flex-row justify-between items-center">
        <div className="flex items-center gap-3 py-4 px-4">
          <Wallet className="w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight">Expense Tracker</h1>
        </div>
        <DataMigration />
      </header>
      <main className="max-w-2xl w-full mx-auto p-4 space-y-6">{children}</main>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
