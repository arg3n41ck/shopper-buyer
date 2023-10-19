import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Globe } from 'react-feather';

import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import useOutsideClick from '@/shared/lib/hooks/useOutsideClick';
import { Accordion } from '@/shared/ui/accordions';

const languages = [
  { name: 'Кыргызча', code: 'kg' },
  { name: 'English', code: 'en' },
  { name: 'Русский', code: 'ru' },
];

export const HeaderChangeLanguage: React.FC = () => {
  const { i18n } = useTranslation();
  const [active, setActive] = useState(false);
  const changeLanguageRef = useRef<HTMLDivElement | null>(null);

  const handleClickActive = () => setActive((prev) => !prev);

  useOutsideClick(changeLanguageRef, () => {
    setActive(false);
  });

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setActive(false);
  };

  return (
    <div className="relative" ref={changeLanguageRef}>
      <div className="block md:hidden">
        <div
          className="flex items-center gap-[4px] cursor-pointer"
          onClick={handleClickActive}
        >
          <Globe size={24} />
          <p className="text-[#676767] text-[16px] font-[500]">
            {i18n.language}
          </p>
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              className="absolute mt-2 right-0 bg-[#fff] p-5 border border-solid border-[#676767] z-[11]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-[12px]">
                {languages.map((language) => (
                  <div
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className="flex py-[11px] px-[12px] items-center justify-between gap-[80px] cursor-pointer transition-background hover:bg-[#f5f5f5]"
                  >
                    <p className="text-[#171717] text-[16px] font-[400]">
                      {language.name}
                    </p>
                    {i18n.language === language.code && <Check size={16} />}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden md:block">
        <Accordion
          title={
            <div className="flex items-center gap-[4px] cursor-pointer">
              <Globe size={24} />
              <p className="text-[#676767] text-[16px] font-[500]">
                {i18n.language}
              </p>
            </div>
          }
        >
          {languages.map((language) => (
            <div
              className="flex py-[11px] px-[12px] items-center justify-between gap-[80px] cursor-pointer transition-background hover:bg-[#f5f5f5]"
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
            >
              <p className="text-[#171717] text-[16px] font-[400]">
                {language.name}
              </p>
              {i18n.language === language.code && <Check size={16} />}
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
