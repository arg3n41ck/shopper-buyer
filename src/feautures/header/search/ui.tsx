import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'react-feather';
import {ForSomeoneFilter, MobileHeader} from '../index';
import LogoIcon from '@/shared/assets/icons/svg/LogoIcon';

import TextField from '@/shared/ui/inputs/textField';

interface FilterOption {
  value: string;
  label: string;
}

interface SearchPopupProps {}

const filterOptions: FilterOption[] = [
  { value: 'for-her', label: 'Для Нее' },
  { value: 'for-him', label: 'Для Него' },
  { value: 'for-children', label: 'Для Детей' },
];

export const HeaderSearchPopup: React.FC<SearchPopupProps> = () => {
  const [search, setSearch] = useState('');
  const [activePopup, setActivePopup] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>(
    filterOptions[0].value,
  );

  const handleChangeSearch = (value: string) => setSearch(value);
  const handleFilterChange = (filter: string) => setActiveFilter(filter);
  const handlePopup = () => setActivePopup((prev) => !prev);

  return (
    <>
      <div className="hidden md:block">
        <Search onClick={handlePopup} size={24} />
      </div>

      <div className="block md:hidden">
        <div
          className="w-[267px] flex items-center gap-[8px] py-[9px] px-[16px] border border-[#676767] cursor-pointer"
          onClick={handlePopup}
        >
          <Search color="#676767" size={24} />
          <p className="text-[#676767] text-[16px] font-[400]">Поиск</p>
        </div>
      </div>

      <AnimatePresence>
        {activePopup && (
          <div
            className="fixed z-[20] top-0 left-1/2 transform -translate-x-1/2 w-full h-full bg-opacity-50 bg-[#000] flex justify-center items-start md:items-normal"
            onClick={handlePopup}
          >
            <motion.div
              className="bg-[#fff] w-full shadow-md max-w-[1440px]"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <div className="hidden md:block">
                <MobileHeader onClose={handlePopup} />
              </div>

              <div className="block md:hidden">
                <div className="flex justify-center pt-[12px]">
                  <LogoIcon />
                </div>
              </div>

              <div className="max-w-[657px] w-full mx-auto my-[36px] grid grid-cols-1 gap-[24px] px-[48px] md:px-[20px]">
                <TextField
                  value={search}
                  onChange={(e) => handleChangeSearch(e.target.value)}
                  onClick={() => setActivePopup(true)}
                  startAdornment={<Search color="#676767" size={24} />}
                  placeholder={`Поиск по разделу «${filterOptions.find(
                    (item) => item.value === activeFilter,
                  )?.label}»`}
                />

                <ForSomeoneFilter
                  options={filterOptions}
                  activeOption={activeFilter}
                  handleChange={handleFilterChange}
                />

                <p className="text-[#676767] text-[16] font-[400]">
                  История поиска
                </p>

                <div className="flex items-center justify-between gap-[20px] py-[11px] px-[12px] cursor-pointer hover:bg-[#f5f5f5]">
                  <p className="text-[#171717] text-[16px] font-[400]">
                    adidas adi2000
                  </p>
                  <X size={16} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
