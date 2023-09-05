import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Globe } from 'react-feather';
import useOutsideClick from '@/shared/lib/hooks/useOutsideClick';
import {
  ChangeLanguageContainer,
  ChangeLanguageInfo,
  ChangeLanguageInfoText,
  PopupLanguageContainer,
  PopupLanguageItem,
  PopupLanguageItemText,
} from './styles';
import {
  LaptopVersion,
  MobileVersion,
  PopupContent,
} from '@/shared/styles/styles';
import { AnimatePresence } from 'framer-motion';
import Accordion from '@/shared/ui/accordion';

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
    <ChangeLanguageContainer ref={changeLanguageRef}>
      <LaptopVersion>
        <ChangeLanguageInfo onClick={handleClickActive}>
          <Globe size={24} />
          <ChangeLanguageInfoText>{i18n.language}</ChangeLanguageInfoText>
        </ChangeLanguageInfo>

        <AnimatePresence>
          {active && (
            <PopupContent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PopupLanguageContainer>
                {languages.map((language) => (
                  <PopupLanguageItem
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    <PopupLanguageItemText>
                      {language.name}
                    </PopupLanguageItemText>
                    {i18n.language === language.code && <Check size={16} />}
                  </PopupLanguageItem>
                ))}
              </PopupLanguageContainer>
            </PopupContent>
          )}
        </AnimatePresence>
      </LaptopVersion>

      <MobileVersion>
        <Accordion
          title={
            <ChangeLanguageInfo>
              <Globe size={24} />
              <ChangeLanguageInfoText>{i18n.language}</ChangeLanguageInfoText>
            </ChangeLanguageInfo>
          }
        >
          {languages.map((language) => (
            <PopupLanguageItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
            >
              <PopupLanguageItemText>{language.name}</PopupLanguageItemText>
              {i18n.language === language.code && <Check size={16} />}
            </PopupLanguageItem>
          ))}
        </Accordion>
      </MobileVersion>
    </ChangeLanguageContainer>
  );
};
