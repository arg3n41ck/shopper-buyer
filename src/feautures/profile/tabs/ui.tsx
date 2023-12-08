import { MainLayout } from '@/widgets/layouts';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

interface Tab {
  label: string;
  path: string;
}

interface TabsProps {
  children: ReactNode;
}

const tabs: Tab[] = [
  { label: 'Ваш аккаунт', path: '/profile/account' },
  { label: 'Личные данные', path: '/profile/personal' },
  { label: 'Заказы', path: '/profile/orders' },
  { label: 'Адреса', path: '/profile/addressesActions' },
];

export const ProfileTabs: React.FC<TabsProps> = ({ children }) => {
  const router = useRouter();

  return (
    <MainLayout>
      <div className="flex gap-[52px] main-container py-10">
        <div className="flex flex-col w-1/4">
          {tabs.map((tab) => (
            <div
              key={tab.label}
              className={`p-4 cursor-pointer ${
                router.pathname === tab.path
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-neutral-100'
              }`}
              onClick={() => router.push(tab.path)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className="w-3/4">{children}</div>
      </div>
    </MainLayout>
  );
};
