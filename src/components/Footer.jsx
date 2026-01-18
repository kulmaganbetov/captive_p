import { Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-gray-500">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Безопасные платежи</span>
          </div>
          <p className="text-xs text-gray-400 text-center">
            © {currentYear} Wi-Fi Portal. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
