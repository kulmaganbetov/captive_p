import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FREEDOMPAY_CONFIG, TEST_AMOUNTS, generateOrderId } from '../config/payment';

const TestPayment = () => {
  const [selectedAmount, setSelectedAmount] = useState(TEST_AMOUNTS[0].value);
  const [customAmount, setCustomAmount] = useState('');
  const [description, setDescription] = useState(FREEDOMPAY_CONFIG.defaultDescription);
  const [status, setStatus] = useState(null); // null | 'pending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');
  const [lastOrderId, setLastOrderId] = useState(null);

  const getAmount = () => {
    const custom = parseInt(customAmount, 10);
    return Number.isFinite(custom) && custom > 0 ? custom : selectedAmount;
  };

  const handlePayment = () => {
    const amount = getAmount();
    if (!amount || amount <= 0) {
      setStatus('error');
      setStatusMessage('Введите корректную сумму');
      return;
    }

    if (typeof window.FreedomPay === 'undefined') {
      setStatus('error');
      setStatusMessage('FreedomPay виджет не загружен. Проверьте подключение скрипта.');
      return;
    }

    const orderId = generateOrderId();
    setLastOrderId(orderId);
    setStatus('pending');
    setStatusMessage('Открывается платежный виджет...');

    try {
      window.FreedomPay.Checkout.open({
        merchant_id: FREEDOMPAY_CONFIG.merchantId,
        order_id: orderId,
        amount: amount,
        currency: FREEDOMPAY_CONFIG.currency,
        description: description || FREEDOMPAY_CONFIG.defaultDescription,
        test: FREEDOMPAY_CONFIG.testMode,
        success_url: FREEDOMPAY_CONFIG.successUrl,
        failure_url: FREEDOMPAY_CONFIG.failureUrl,
        onSuccess: (data) => {
          console.log('FreedomPay success:', data);
          setStatus('success');
          setStatusMessage(`Оплата успешно завершена. Order ID: ${orderId}`);
        },
        onError: (error) => {
          console.error('FreedomPay error:', error);
          setStatus('error');
          setStatusMessage(
            `Ошибка оплаты: ${error?.message || 'Неизвестная ошибка'}`
          );
        },
        onPending: (data) => {
          console.log('FreedomPay pending:', data);
          setStatus('pending');
          setStatusMessage('Платёж ожидает подтверждения...');
        },
        onClose: () => {
          console.log('FreedomPay widget closed');
          if (status === 'pending') {
            setStatus(null);
            setStatusMessage('');
          }
        },
      });
    } catch (err) {
      console.error('FreedomPay widget error:', err);
      setStatus('error');
      setStatusMessage(`Не удалось открыть виджет: ${err.message}`);
    }
  };

  const statusConfig = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-600',
      title: 'Успешно',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-600',
      title: 'Ошибка',
    },
    pending: {
      icon: Clock,
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-800',
      iconColor: 'text-amber-600',
      title: 'Ожидание',
    },
  };

  const currentStatus = status ? statusConfig[status] : null;
  const StatusIcon = currentStatus?.icon;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Тестовая оплата</h1>
                <p className="text-sm text-gray-500">FreedomPay Checkout Widget</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Тестовый режим</p>
                  <p>
                    Merchant ID: <code className="bg-blue-100 px-1 rounded">{FREEDOMPAY_CONFIG.merchantId}</code>
                  </p>
                  <p>
                    Test Mode: <code className="bg-blue-100 px-1 rounded">{FREEDOMPAY_CONFIG.testMode}</code>
                  </p>
                </div>
              </div>
            </div>

            {/* Amount selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Выберите сумму
              </label>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {TEST_AMOUNTS.map((amount) => (
                  <button
                    key={amount.value}
                    onClick={() => {
                      setSelectedAmount(amount.value);
                      setCustomAmount('');
                    }}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                      selectedAmount === amount.value && !customAmount
                        ? 'bg-blue-600 text-white shadow-soft'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {amount.label}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Или введите свою сумму"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                min="1"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание платежа
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Оплата заказа"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Сумма к оплате:</span>
                <span className="text-2xl font-bold text-gray-900">{getAmount()} ₸</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Валюта:</span>
                <span className="font-medium text-gray-900">{FREEDOMPAY_CONFIG.currency}</span>
              </div>
            </div>

            {/* Pay button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-soft-lg transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Оплатить {getAmount()} ₸
            </motion.button>

            {/* Status display */}
            {currentStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 ${currentStatus.bgColor} ${currentStatus.borderColor} border rounded-xl p-4`}
              >
                <div className="flex items-start gap-3">
                  <StatusIcon className={`w-5 h-5 ${currentStatus.iconColor} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <p className={`font-semibold ${currentStatus.textColor} mb-1`}>
                      {currentStatus.title}
                    </p>
                    <p className={`text-sm ${currentStatus.textColor}`}>{statusMessage}</p>
                    {lastOrderId && (
                      <p className={`text-xs ${currentStatus.textColor} mt-2 font-mono`}>
                        Order ID: {lastOrderId}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            <p className="text-xs text-gray-500 text-center mt-6">
              Эта страница предназначена для тестирования платёжного виджета FreedomPay.
              Документация:{' '}
              <a
                href="https://docs.freedompay.kz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                docs.freedompay.kz
              </a>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default TestPayment;
