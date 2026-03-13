// 🟦 [TEMPLATE: RESPONSIVE_FOOTER]
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export default function Footer() {
  const { t, language } = useContext(LanguageContext);

  return (
    // Changed bg-darkText to bg-gray-900 (Built directly into Tailwind)
    <footer className="bg-gray-900 text-white pt-10 pb-4 mt-20 border-t-4 border-primary shadow-2xl">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold mb-4">{t('schoolName')}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {language === 'bn' 
              ? "শিক্ষাই জাতির মেরুদণ্ড। আমরা শিক্ষার্থীদের আধুনিক ও নৈতিক শিক্ষায় শিক্ষিত করতে বদ্ধপরিকর।" 
              : "Education is the backbone of a nation. We are committed to providing modern and moral education."}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">{language === 'bn' ? "গুরুত্বপূর্ণ লিংক" : "Quick Links"}</h3>
          <ul className="text-gray-400 text-sm flex flex-col gap-2">
            <li><a href="/" className="hover:text-primary transition">{t('home')}</a></li>
            <li><a href="/admission" className="hover:text-primary transition">{t('admission')}</a></li>
            <li><a href="/notice" className="hover:text-primary transition">{t('notice')}</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">{language === 'bn' ? "যোগাযোগ" : "Contact Us"}</h3>
          <p className="text-gray-400 text-sm mb-1">📍 Kodanda, Dhaka, Bangladesh</p>
          <p className="text-gray-400 text-sm mb-1">📞 +880 1700-000000</p>
          <p className="text-gray-400 text-sm">📧 info@kodandaschool.com</p>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} {t('schoolName')}. All Rights Reserved.
      </div>
    </footer>
  );
}