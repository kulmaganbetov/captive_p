import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import PricingCard from '../components/PricingCard';
import PaymentForm from '../components/PaymentForm';
import Footer from '../components/Footer';
import { useMikroTikParams } from '../utils/mikrotik';

const PRICING_PLANS = [
  {
    id: 'start',
    name: 'Старт',
    duration: '1 час',
    price: 200,
    popular: false,
  },
  {
    id: 'business',
    name: 'Бизнес',
    duration: '3 часа',
    price: 500,
    popular: true,
  },
  {
    id: 'unlimited',
    name: 'Безлимит',
    duration: '24 часа',
    price: 1000,
    popular: false,
  },
];

const Home = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { mac, ip, linkOrig } = useMikroTikParams();

  const handlePayment = async (email) => {
    setIsLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

      const response = await fetch(`${baseUrl}/api/payment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: selectedPlan.id,
          email: email,
          mac: mac,
          ip: ip,
          link_orig: linkOrig,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Успешная оплата - переходим на страницу успеха
        navigate('/success', {
          state: {
            planName: selectedPlan.name,
            duration: selectedPlan.duration,
            email: email,
          },
        });
      } else {
        // Обработка ошибки
        alert(data.error || 'Произошла ошибка при оплате. Попробуйте снова.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Произошла ошибка при подключении к серверу. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Pricing Cards */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Выберите тариф</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PRICING_PLANS.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PricingCard
                    plan={plan}
                    isSelected={selectedPlan?.id === plan.id}
                    onSelect={() => setSelectedPlan(plan)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <PaymentForm
              selectedPlan={selectedPlan}
              onSubmit={handlePayment}
              isLoading={isLoading}
            />
          </div>

          {/* Info Block */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center text-sm text-gray-500"
          >
            <p>После оплаты вы автоматически получите доступ к интернету</p>
            <p className="mt-1">Чек будет отправлен на указанный email</p>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
