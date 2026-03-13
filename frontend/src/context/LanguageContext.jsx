// 🟦 [TEMPLATE: MULTI_LANGUAGE_CONTEXT]
import { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const[language, setLanguage] = useState('bn'); // 'bn' for Bangla, 'en' for English

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  // Dictionary for translations
  const translations = {
    bn: {
      schoolName: "কোদন্ডা উচ্চ বিদ্যালয়",
      home: "হোম",
      admission: "অনলাইন ভর্তি",
      teachers: "শিক্ষকবৃন্দ",
      notice: "নোটিশ",
      payFees: "ফি প্রদান",
      login: "ছাত্র লগইন",
      logout: "লগআউট",
      search: "খুঁজুন...",
      noticeText: "জরুরী নোটিশ: আগামী রবিবার থেকে অর্ধবার্ষিক পরীক্ষা শুরু হবে। সকল শিক্ষার্থীকে প্রবেশপত্র সংগ্রহের নির্দেশ দেওয়া হলো।"
    },
    en: {
      schoolName: "Kodanda School",
      home: "Home",
      admission: "Online Admission",
      teachers: "Teachers",
      notice: "Notice",
      payFees: "Pay Fees",
      login: "Student Login",
      logout: "Logout",
      search: "Search...",
      noticeText: "Urgent Notice: Half-yearly exams start next Sunday. All students are instructed to collect their admit cards."
    }
  };

  // Helper function to easily get translated text
  const t = (key) => translations[language][key];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};