import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader2 } from 'lucide-react';

const PaymentForm = ({ selectedPlan, onSubmit, isLoading, t }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const labels = t || {
    enterEmail: 'Email для отправки чека',
    emailPlaceholder: 'your@email.com',
    emailRequired: 'Email обязателен для заполнения',
    emailInvalid: 'Введите корректный email адрес',
    selectPlanFirst: 'Сначала выберите тариф',
    payButton: 'Оплатить',
    processing: 'Обработка платежа...',
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError && e.target.value) setEmailError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) { setEmailError(labels.emailRequired); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError(labels.emailInvalid); return; }
    onSubmit(email);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          {labels.enterEmail}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={labels.emailPlaceholder}
            className={`block w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              ${emailError ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            disabled={isLoading}
          />
        </div>
        {emailError && (
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-red-600">
            {emailError}
          </motion.p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isLoading || !selectedPlan}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200
          ${isLoading || !selectedPlan
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-soft-lg'}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            {labels.processing}
          </span>
        ) : selectedPlan ? (
          `${labels.payButton} ${selectedPlan.price} ₸`
        ) : (
          labels.selectPlanFirst
        )}
      </motion.button>
    </motion.form>
  );
};

export default PaymentForm;
