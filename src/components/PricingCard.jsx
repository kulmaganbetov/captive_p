import { motion } from 'framer-motion';
import { Clock, Check } from 'lucide-react';

const PricingCard = ({ plan, isSelected, onSelect }) => {
  const { id, name, duration, price, popular } = plan;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`
        relative cursor-pointer rounded-2xl p-6 transition-all duration-300
        ${
          isSelected
            ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-soft-lg ring-2 ring-primary-400 ring-offset-2'
            : 'bg-white text-gray-900 shadow-soft hover:shadow-soft-lg border border-gray-200'
        }
      `}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500 text-white shadow-soft">
            Популярный
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
          {name}
        </h3>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-primary-600" strokeWidth={3} />
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className={`text-4xl font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
          {price}
        </span>
        <span className={`text-lg ${isSelected ? 'text-primary-100' : 'text-gray-500'}`}>₸</span>
      </div>

      <div className={`flex items-center gap-2 ${isSelected ? 'text-primary-50' : 'text-gray-600'}`}>
        <Clock className="w-4 h-4" />
        <span className="text-sm font-medium">{duration}</span>
      </div>
    </motion.div>
  );
};

export default PricingCard;
