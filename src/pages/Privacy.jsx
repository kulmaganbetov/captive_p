import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../locales/translations';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Privacy = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.success.backToHome}</span>
        </button>

        {/* Document Header */}
        <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t.privacy.title}</h1>
              <p className="text-gray-500 mt-1">{language === 'ru' ? 'Действует с 01.01.2024' : '01.01.2024 бастап күшіне енеді'}</p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">{t.privacy.intro}</p>
        </div>

        {/* Document Content */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{t.privacy.section1.title}</h2>
            <p className="text-gray-600 leading-relaxed">{t.privacy.section1.content}</p>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{t.privacy.section2.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-3">{t.privacy.section2.content}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {t.privacy.section2.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{t.privacy.section3.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-3">{t.privacy.section3.content}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {t.privacy.section3.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{t.privacy.section4.title}</h2>
            <p className="text-gray-600 leading-relaxed">{t.privacy.section4.content}</p>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{t.privacy.section5.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-3">{t.privacy.section5.content}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {t.privacy.section5.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Section 6 */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{t.privacy.section6.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-3">{t.privacy.section6.content}</p>
            <div className="bg-gray-50 rounded-xl p-4">
              <pre className="text-sm text-gray-700 font-mono whitespace-pre-line">
                {t.privacy.section6.contact}
              </pre>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
