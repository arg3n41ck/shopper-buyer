import React from 'react';
import {
  FooterInfoChildText,
  FooterInfoColumnInnerTextsContainer,
  FooterInfoContainer,
  FooterInfoColumnContainer,
  FooterInfoHeadText,
  MainFooterContainer,
  FooterBottomInfo,
  FooterBottomInfoText,
  FooterInfoIconsContainer,
  FooterTextAndIconsContainer,
} from './styles';
import LogoIcon from '@/assets/icons/svg/LogoIcon';
import BoomerangIcon from '@/assets/icons/svg/BoomerangIcon';
import DnlIcon from '@/assets/icons/svg/DnlIcon';
import VisaIcon from '@/assets/icons/svg/VisaIcon';
import MasterCardIcon from '@/assets/icons/svg/MasterCardIcon';
import { Instagram, Linkedin, Twitter } from 'react-feather';
import TiktokIcon from '@/assets/icons/svg/TiktokIcon';
import Accordion from '@/shared/ui/accordion';
import { LaptopVersion, MobileVersion } from '@/shared/styles/styles';

interface TypeFooterTexts {
  id: number;
  title: string;
}

interface FooterSectionProps {
  title?: string;
  children: React.ReactNode;
}

interface FooterIconsSectionProps {
  title: string;
  icons: React.ReactNode;
}

const footerTexts: TypeFooterTexts[] = [
  {
    id: 1,
    title: 'Статус доставки',
  },
  {
    id: 2,
    title: 'Возврат',
  },
  {
    id: 3,
    title: 'Оплата',
  },
  {
    id: 4,
    title: 'Служба поддержки',
  },
  {
    id: 5,
    title: 'Контакты',
  },
  {
    id: 6,
    title: 'Горячая линия',
  },
];

const FooterInfoColumn: React.FC<FooterSectionProps> = ({
  title,
  children,
}) => (
  <FooterInfoColumnContainer>
    {title && <FooterInfoHeadText>{title}</FooterInfoHeadText>}
    <FooterInfoColumnInnerTextsContainer>
      {children}
    </FooterInfoColumnInnerTextsContainer>
  </FooterInfoColumnContainer>
);

const FooterIconsSection: React.FC<FooterIconsSectionProps> = ({
  title,
  icons,
}) => (
  <FooterTextAndIconsContainer>
    <FooterInfoChildText>{title}</FooterInfoChildText>
    <FooterInfoIconsContainer>{icons}</FooterInfoIconsContainer>
  </FooterTextAndIconsContainer>
);

const FooterSection: React.FC<FooterSectionProps> = ({ title, children }) => (
  <>
    <MobileVersion>
      <Accordion title={<FooterInfoHeadText>{title}</FooterInfoHeadText>}>
        <FooterInfoColumn>{children}</FooterInfoColumn>
      </Accordion>
    </MobileVersion>

    <LaptopVersion>
      <FooterInfoColumn title={title}>{children}</FooterInfoColumn>
    </LaptopVersion>
  </>
);

const deliveryIcons = (
  <>
    <BoomerangIcon />
    <DnlIcon />
  </>
);

const paymentIcons = (
  <>
    <VisaIcon />
    <MasterCardIcon />
  </>
);

const socialMediaIcons = (
  <>
    <Instagram />
    <TiktokIcon />
    <Twitter />
    <TiktokIcon />
    <Linkedin />
  </>
);

const MainFooter = () => {
  return (
    <MainFooterContainer>
      <FooterInfoContainer>
        <FooterSection title="Помощь">
          {footerTexts.map((item) => (
            <FooterInfoChildText key={item.id}>
              {item.title}
            </FooterInfoChildText>
          ))}
        </FooterSection>

        <FooterSection title="Продавай на SHOPPER">
          {footerTexts.map((item) => (
            <FooterInfoChildText key={item.id}>
              {item.title}
            </FooterInfoChildText>
          ))}
        </FooterSection>

        <FooterSection title="Контакты">
          {footerTexts.map((item) => (
            <FooterInfoChildText key={item.id}>
              {item.title}
            </FooterInfoChildText>
          ))}
        </FooterSection>

        <FooterInfoColumnContainer>
          <FooterIconsSection title="Способы доставки" icons={deliveryIcons} />

          <FooterIconsSection
            title="Мы принимаем к оплате"
            icons={paymentIcons}
          />

          <FooterIconsSection
            title="Подпишись на нас в социальных сетях"
            icons={socialMediaIcons}
          />
        </FooterInfoColumnContainer>
      </FooterInfoContainer>

      <FooterBottomInfo>
        <LogoIcon />
        <FooterBottomInfoText>
          © 2022 Shopper Inc. Все права защищены
        </FooterBottomInfoText>
      </FooterBottomInfo>
    </MainFooterContainer>
  );
};

export default MainFooter;
