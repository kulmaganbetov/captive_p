import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
      aria-label="Переключить язык / Тілді ауыстыру"
    >
      <span className="text-sm font-medium text-white">
        {language === 'ru' ? '🇷🇺 РУ' : '🇰🇿 ҚАЗ'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
