import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, Mail, Clock, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Fail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // Получаем параметры от Robokassa
    const outSum = searchParams.get('OutSum');
    const invId = searchParams.get('InvId');

    // Дополнительные параметры (custom parameters)
    const email = searchParams.get('shp_email');
    const planName = searchParams.get('shp_plan_name');
    const duration = searchParams.get('shp_duration');

    setPaymentData({
      planName: planName,
      duration: duration,
      email: email,
      amount: outSum,
      invId: invId,
    });

    // Уведомляем бэкенд о неудачном платеже (опционально)
    const notifyBackend = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        await fetch(`${baseUrl}/api/payment/fail?${searchParams.toString()}`, {
          method: 'GET',
        });
      } catch (err) {
        console.error('Failed to notify backend:', err);
      }
    };

    if (invId) {
      notifyBackend();
    }
  }, [searchParams]);

  const handleRetry = () => {
    navigate('/', { replace: true });
  };

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
            {/* Fail Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="flex justify-center mb-6"
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-12 h-12 text-red-600" strokeWidth={2} />
              </div>
            </motion.div>

            {/* Fail Message */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
            >
              Оплата не прошла
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-8"
            >
              К сожалению, платеж не был завершен
            </motion.p>

            {/* Payment Details */}
            {paymentData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4 mb-8"
              >
                {paymentData.planName && (
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Тариф
                      </span>
                      <span className="font-semibold text-gray-900">
                        {paymentData.planName} ({paymentData.duration})
                      </span>
                    </div>
                  </div>
                )}

                {paymentData.email && (
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Email
                      </span>
                      <span className="font-medium text-gray-900 truncate max-w-[200px]">
                        {paymentData.email}
                      </span>
                    </div>
                  </div>
                )}

                {paymentData.invId && (
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm">
                        ID платежа
                      </span>
                      <span className="font-mono text-sm text-gray-900">
                        #{paymentData.invId}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Info Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-amber-50 rounded-2xl p-4 mb-6"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm text-amber-800 font-medium mb-1">
                    Возможные причины:
                  </p>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Недостаточно средств на счете</li>
                    <li>• Платеж был отменен</li>
                    <li>• Технические проблемы с банком</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Retry Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={handleRetry}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-soft-lg transition-all"
            >
              Попробовать снова
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 text-sm text-gray-500"
            >
              Если проблема сохраняется, обратитесь в службу поддержки
            </motion.p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Fail;
