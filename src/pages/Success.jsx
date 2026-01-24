import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, Clock, Loader2, DollarSign } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Получаем параметры от Robokassa
        const outSum = searchParams.get('OutSum');
        const invId = searchParams.get('InvId');
        const signatureValue = searchParams.get('SignatureValue');

        // Дополнительные параметры (custom parameters)
        const email = searchParams.get('shp_email');
        const planName = searchParams.get('shp_plan_name');
        const duration = searchParams.get('shp_duration');

        console.log('✅ Success page loaded with params:', {
          outSum,
          invId,
          email,
          planName,
          duration,
        });

        if (!invId) {
          setError('Отсутствуют данные о платеже');
          setIsLoading(false);
          return;
        }

        // Тестовый режим (без бэкенда)
        const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

        console.log('🔍 Demo mode check:', {
          isDemoMode,
          envValue: import.meta.env.VITE_DEMO_MODE,
          type: typeof import.meta.env.VITE_DEMO_MODE,
        });

        if (isDemoMode) {
          console.log('✅ Demo mode ACTIVE - skipping backend verification');

          // Имитируем задержку проверки
          await new Promise(resolve => setTimeout(resolve, 1500));

          // В тестовом режиме сразу возвращаем успешный результат
          setPaymentData({
            planName: planName,
            duration: duration,
            email: email,
            amount: outSum,
            invId: invId,
          });
          setIsLoading(false);
          return;
        }

        console.log('⚠️ Demo mode INACTIVE - will try backend verification');

        // Реальный режим с бэкендом
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

        console.log('🔗 Backend URL:', baseUrl);

        // Отправляем запрос на бэкенд для верификации платежа
        const response = await fetch(`${baseUrl}/api/payment/success?${searchParams.toString()}`, {
          method: 'GET',
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setPaymentData({
            planName: planName || data.plan_name,
            duration: duration || data.duration,
            email: email || data.email,
            amount: outSum,
            invId: invId,
          });
        } else {
          setError(data.error || 'Не удалось подтвердить платеж');
        }
      } catch (err) {
        console.error('Verification error:', err);
        setError('Произошла ошибка при проверке платежа');
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Проверяем платеж...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Ошибка проверки платежа</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
            >
              Вернуться на главную
            </button>
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
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600" strokeWidth={2} />
              </div>
            </motion.div>

            {/* Success Message */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
            >
              Оплата успешна!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-8"
            >
              Вы успешно подключены к интернету
            </motion.p>

            {/* Plan Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 mb-8"
            >
              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Тариф
                  </span>
                  <span className="font-semibold text-gray-900">
                    {paymentData?.planName} ({paymentData?.duration})
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Сумма
                  </span>
                  <span className="font-semibold text-gray-900">
                    {paymentData?.amount} ₸
                  </span>
                </div>
              </div>

              {paymentData?.email && (
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

              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">
                    ID платежа
                  </span>
                  <span className="font-mono text-sm text-gray-900">
                    #{paymentData?.invId}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Info Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-primary-50 rounded-2xl p-4"
            >
              <p className="text-sm text-primary-700">
                Чек был отправлен на указанный email адрес.
                <br />
                Приятного пользования интернетом!
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
