import { Wallet } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import DataMigration from '../DataMigration';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Wallet className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-semibold tracking-tight">
              Expense Tracker
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <DataMigration />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="max-w-2xl w-full mx-auto p-4 space-y-4">{children}</main>
    </div>
  );
};

export default MainLayout;
