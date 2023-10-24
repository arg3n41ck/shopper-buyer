import React from 'react';
import { Trash2 } from 'react-feather';
import Image from 'next/image';

const ProductItemInBag = () => {
  return (
    <div className="w-full flex items-start justify-between">
      <Image src={'/sumka.png'} width={120} height={120} alt="lacoste" />

      <div className="flex flex-col gap-1">
        <p className="text-[#171717] text-[20px] font-semibold">
          Stella McCartney
        </p>

        <p className="text-[#676767] text-[16px] font-normal">
          брюки с разрезами
        </p>

        <div className="flex items-center gap-1">
          <p className="text-[#676767] text-[16px] font-normal">Цвет:</p>
          <p className="text-[#171717] text-[16px] font-normal">Черный</p>
        </div>

        <div className="flex items-center gap-1">
          <p className="text-[#676767] text-[16px] font-normal">Кол-во:</p>
        </div>

        <div className="flex items-center gap-1">
          <p className="text-[#171717] text-[16px] font-semibold">
            от <span className="line-through">18 650 сом</span>
          </p>

          <p className="text-[#b91c1c] text-[16px] font-semibold">18 650 сом</p>
        </div>
      </div>

      <Trash2 size={24} />
    </div>
  );
};

export default ProductItemInBag;
