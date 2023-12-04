import React from 'react';
import { ArrowRight } from 'react-feather';
import { Button } from '@/shared/ui/buttons';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import Image from 'next/image';

export const Looks = () => {
  return (
    <div className="w-full flex items-center justify-between gap-[20px] md:flex-col md:items-start md:gap-[8px]">
      <div className="max-w-[504px] flex flex-col justify-center bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.71)] to-white">
        <p className="text-black text-[36px] font-medium">Летние образы</p>
        <p className="text-black text-[20px] font-normal">
          Бикини, босоножки, топы, шорты и многое другое
        </p>
        <p className="text-gray-600 text-base font-normal">
          Измените свои планы на лето с помощью этих ключевых летних вещей
        </p>
        <div className="block md:hidden">
          <Button variant={BUTTON_STYLES.withoutBackground} className="mt-8">
            Смотреть подборку
            <ArrowRight />
          </Button>
        </div>
      </div>

      <div className="w-[656px] md:w-full">
        <Image
          src={'/party.png'}
          width={656}
          height={440}
          alt="party"
          layout="responsive"
        />
      </div>
    </div>
  );
};
