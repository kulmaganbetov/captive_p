import { Wifi } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../locales/translations';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <header className="w-full bg-gradient-to-r from-primary-500 to-primary-600">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-soft-lg backdrop-blur-sm">
              <Wifi className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">{t.header.title}</h1>
              <p className="text-sm text-white/80">{t.header.subtitle}</p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
