import { Wifi } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-soft-lg">
            <Wifi className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Wi-Fi доступ</h1>
            <p className="text-sm text-gray-500">Выберите тариф для подключения</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
