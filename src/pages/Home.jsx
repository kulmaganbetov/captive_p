import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import PricingCard from '../components/PricingCard';
import PaymentForm from '../components/PaymentForm';
import Footer from '../components/Footer';
import { useMikroTikParams } from '../utils/mikrotik';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../locales/translations';

const PRICING_PLANS = [
  { id: 'start',     nameKey: 'start',     price: 200,  popular: false },
  { id: 'business',  nameKey: 'business',  price: 500,  popular: true  },
  { id: 'unlimited', nameKey: 'unlimited', price: 1000, popular: false },
];

const Home = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { mac, ip } = useMikroTikParams();
  const { language } = useLanguage();
  const t = useTranslation(language);

  const handlePayment = async (email) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const invId = Math.floor(Math.random() * 1000000);
    const successParams = new URLSearchParams({
      OutSum: selectedPlan.price.toString(),
      InvId: invId.toString(),
      shp_email: email,
      shp_plan_name: t.plans[selectedPlan.nameKey].name,
      shp_duration: t.plans[selectedPlan.nameKey].duration,
      shp_mac: mac || '',
      shp_ip: ip || '',
    });

    navigate(`/success?${successParams.toString()}`);
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.plans.selectPlan}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PRICING_PLANS.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PricingCard
                    plan={{
                      ...plan,
                      name: t.plans[plan.nameKey].name,
                      duration: t.plans[plan.nameKey].duration,
                      popularLabel: t.plans.popular,
                    }}
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
              selectedPlan={selectedPlan ? {
                ...selectedPlan,
                name: t.plans[selectedPlan.nameKey].name,
                duration: t.plans[selectedPlan.nameKey].duration,
              } : null}
              onSubmit={handlePayment}
              isLoading={isLoading}
              t={t.payment}
            />
          </div>

          {/* Info Block */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center text-sm text-gray-500"
          >
            <p>{t.payment.afterPayment}</p>
            <p className="mt-1">{t.payment.receiptEmail}</p>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
