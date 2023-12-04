import React from 'react';
import LogoIcon from '@/shared/assets/icons/svg/LogoIcon';
import BoomerangIcon from '@/shared/assets/icons/svg/BoomerangIcon';
import DnlIcon from '@/shared/assets/icons/svg/DnlIcon';
import VisaIcon from '@/shared/assets/icons/svg/VisaIcon';
import MasterCardIcon from '@/shared/assets/icons/svg/MasterCardIcon';
import { Instagram, Linkedin, Twitter } from 'react-feather';
import TiktokIcon from '@/shared/assets/icons/svg/TiktokIcon';
import { Accordion } from '@/shared/ui/accordions';

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
  <div className="flex flex-col gap-4">
    {title && (
      <p className="text-[#171717] text-[16px] font-semibold uppercase">
        {title}
      </p>
    )}
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

const FooterIconsSection: React.FC<FooterIconsSectionProps> = ({
  title,
  icons,
}) => (
  <div className="flex flex-col gap-2">
    <p className="text-[#676767] text-[16px] font-normal cursor-pointer">
      {title}
    </p>
    <div className="flex items-center gap-4">{icons}</div>
  </div>
);

const FooterSection: React.FC<FooterSectionProps> = ({ title, children }) => (
  <>
    <div className="hidden md:block">
      <Accordion
        title={
          <p className="text-[#171717] text-[16px] font-semibold uppercase">
            {title}
          </p>
        }
      >
        <FooterInfoColumn>{children}</FooterInfoColumn>
      </Accordion>
    </div>

    <div className="block md:hidden">
      <FooterInfoColumn title={title}>{children}</FooterInfoColumn>
    </div>
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
    <div className="w-full bg-[#f8f8f8] mt-[50px] md:mt-[20px] border-t border-[#dbdbdb]">
      <div className="main-container">
        <div className="py-[52px] md:py-[20px] flex items-end flex-wrap gap-[40px] justify-between w-90% md:flex-col md:items-start md:gap-[20px]">
          <FooterSection title="Помощь">
            {footerTexts.map((item) => (
              <p
                className="text-[#676767] text-[16px] font-normal cursor-pointer"
                key={item.id}
              >
                {item.title}
              </p>
            ))}
          </FooterSection>

          <FooterSection title="Продавай на SHOPPER">
            {footerTexts.map((item) => (
              <p
                className="text-[#676767] text-[16px] font-normal cursor-pointer"
                key={item.id}
              >
                {item.title}
              </p>
            ))}
          </FooterSection>

          <FooterSection title="Контакты">
            {footerTexts.map((item) => (
              <p
                className="text-[#676767] text-[16px] font-normal cursor-pointer"
                key={item.id}
              >
                {item.title}
              </p>
            ))}
          </FooterSection>

          <div className="flex flex-col gap-4">
            <FooterIconsSection
              title="Способы доставки"
              icons={deliveryIcons}
            />

            <FooterIconsSection
              title="Мы принимаем к оплате"
              icons={paymentIcons}
            />

            <FooterIconsSection
              title="Подпишись на нас в социальных сетях"
              icons={socialMediaIcons}
            />
          </div>
        </div>

        <div className="py-[16px] md:py-[16px] flex justify-between  flex-wrap gap-[15px] border-t-1 border-[#dbdbdb]">
          <LogoIcon />
          <p className="text-[#676767] text-[16px] font-400">
            © 2022 Shopper Inc. Все права защищены
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
