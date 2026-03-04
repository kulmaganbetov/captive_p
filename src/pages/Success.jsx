import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, Clock, Loader2, DollarSign } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../locales/translations';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);
  const { language } = useLanguage();
  const t = useTranslation(language);

  useEffect(() => {
    const outSum  = searchParams.get('OutSum');
    const invId   = searchParams.get('InvId');
    const email   = searchParams.get('shp_email');
    const planName = searchParams.get('shp_plan_name');
    const duration = searchParams.get('shp_duration');

    if (!invId) {
      navigate('/');
      return;
    }

    // Небольшая задержка для анимации загрузки
    const timer = setTimeout(() => {
      setPaymentData({ planName, duration, email, amount: outSum, invId });
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchParams, navigate]);

  if (!paymentData) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">{t.success.verifying}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12 text-center">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="flex justify-center mb-6"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-14 h-14 text-green-500" strokeWidth={1.5} />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
            >
              {t.success.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 mb-8"
            >
              {t.success.subtitle}
            </motion.p>

            {/* Plan Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3 mb-8"
            >
              <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                <span className="text-gray-500 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {t.success.plan}
                </span>
                <span className="font-semibold text-gray-900">
                  {paymentData.planName} — {paymentData.duration}
                </span>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                <span className="text-gray-500 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  {t.success.amount}
                </span>
                <span className="font-semibold text-gray-900">{paymentData.amount} ₸</span>
              </div>

              {paymentData.email && (
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    {t.success.email}
                  </span>
                  <span className="font-medium text-gray-900 truncate max-w-[200px]">
                    {paymentData.email}
                  </span>
                </div>
              )}

              <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                <span className="text-gray-500 text-sm">{t.success.paymentId}</span>
                <span className="font-mono text-sm text-gray-900">#{paymentData.invId}</span>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-primary-50 rounded-2xl p-4"
            >
              <p className="text-sm text-primary-700">
                {t.success.receiptSent}<br />{t.success.enjoyInternet}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Success;
