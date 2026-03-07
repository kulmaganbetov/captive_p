import { Shield, MapPin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../locales/translations';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <footer className="w-full bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-semibold mb-3">{t.footer.company}</h3>
            <p className="text-sm text-gray-400 mb-2">{t.footer.ownerName}</p>
            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{t.footer.bin}: 840726401204</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{t.footer.addressValue}</span>
              </p>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">{language === 'ru' ? 'Документы' : 'Құжаттар'}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  {t.footer.termsOfService}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  {t.footer.services}
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Payment */}
          <div>
            <h3 className="text-white font-semibold mb-3">{language === 'ru' ? 'Безопасность' : 'Қауіпсіздік'}</h3>
            <div className="flex items-center gap-2 text-sm mb-3">
              <Shield className="w-4 h-4 text-green-400" />
              <span>{t.footer.securePayment}</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              {t.footer.paymentProcessor}
            </p>
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-2">{t.footer.acceptedCards}:</p>
              <div className="flex items-center gap-2">
                <div className="bg-white px-2 py-1 rounded text-xs font-semibold text-blue-900">
                  VISA
                </div>
                <div className="bg-white px-2 py-1 rounded text-xs font-semibold text-orange-600">
                  Mastercard
                </div>
              </div>
              <a
                href="https://tiptoppay.kz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors mt-2 inline-block"
              >
                TipTop Pay →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-xs text-gray-400 text-center">
            © {currentYear} {t.footer.company}. {t.footer.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
