// 🟦[TEMPLATE: SLIDING_NOTICE_BAR]
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export default function TopNoticeBar() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="bg-red-600 text-white py-1 px-4 text-sm font-bold flex items-center shadow-md z-50 sticky top-0">
      <span className="whitespace-nowrap bg-red-800 px-2 py-1 rounded mr-2 uppercase">
        {t('notice')}
      </span>
      {/* <marquee> is the easiest way to make text slide without complex CSS animations */}
      <marquee behavior="scroll" direction="left" scrollamount="5">
        {t('noticeText')}
      </marquee>
    </div>
  );
}