import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wifi, Zap, Shield, CreditCard, Clock, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../locales/translations';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Services = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);

  const iconMap = {
    0: Zap,
    1: Shield,
    2: CreditCard,
    3: Clock,
    4: Users,
    5: Wifi,
  };

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

        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl shadow-soft-lg p-8 md:p-12 mb-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Wifi className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{t.services.title}</h1>
          </div>
          <p className="text-lg text-white/90">{t.services.intro}</p>
        </div>

        {/* Tariffs Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.services.tariffs.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Start Plan */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{t.services.tariffs.start.name}</h3>
                <p className="text-gray-500">{t.services.tariffs.start.duration}</p>
                <div className="text-4xl font-bold text-primary-600 mt-4">200₸</div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{t.services.tariffs.start.description}</p>
              <ul className="space-y-2">
                {t.services.tariffs.start.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Plan */}
            <div className="bg-white rounded-2xl shadow-soft-lg p-6 border-2 border-primary-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {t.plans.popular}
                </span>
              </div>
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{t.services.tariffs.business.name}</h3>
                <p className="text-gray-500">{t.services.tariffs.business.duration}</p>
                <div className="text-4xl font-bold text-primary-600 mt-4">500₸</div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{t.services.tariffs.business.description}</p>
              <ul className="space-y-2">
                {t.services.tariffs.business.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Unlimited Plan */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{t.services.tariffs.unlimited.name}</h3>
                <p className="text-gray-500">{t.services.tariffs.unlimited.duration}</p>
                <div className="text-4xl font-bold text-primary-600 mt-4">1000₸</div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{t.services.tariffs.unlimited.description}</p>
              <ul className="space-y-2">
                {t.services.tariffs.unlimited.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.services.features.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.services.features.items.map((feature, index) => {
              const Icon = iconMap[index] || Wifi;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-soft p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t.services.howItWorks.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.services.howItWorks.steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">{index + 1}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold"
            >
              {language === 'ru' ? 'Выбрать тариф' : 'Тарифті таңдау'}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
