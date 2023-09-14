import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TextField from '@/shared/ui/textField';
import { Search, X } from 'react-feather';
import { ForSomeoneFilter } from '../..';
import LogoIcon from '@/assets/icons/svg/LogoIcon';
import {
  FakeSearchInputBlock,
  FakeSearchInputText,
  HeaderSearchContainer,
  HistoryBlock,
  HistorySearchText,
  HistoryTitle,
  LogoIconBlock,
  PopupContent,
  PopupOverlay,
} from './styles';
import { MobileHeader } from '../../menu/mobileHeader';
import { LaptopVersion, MobileVersion } from '@/shared/styles/styles';

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
      <MobileVersion>
        <Search onClick={handlePopup} size={24} />
      </MobileVersion>

      <LaptopVersion>
        <FakeSearchInputBlock onClick={handlePopup}>
          <Search color="#676767" size={24} />
          <FakeSearchInputText>Поиск</FakeSearchInputText>
        </FakeSearchInputBlock>
      </LaptopVersion>

      <AnimatePresence>
        {activePopup && (
          <PopupOverlay onClick={handlePopup}>
            <PopupContent
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <MobileVersion>
                <MobileHeader onClose={handlePopup} />
              </MobileVersion>

              <LaptopVersion>
                <LogoIconBlock>
                  <LogoIcon />
                </LogoIconBlock>
              </LaptopVersion>

              <HeaderSearchContainer>
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

                <HistorySearchText>История поиска</HistorySearchText>

                <HistoryBlock>
                  <HistoryTitle>adidas adi2000</HistoryTitle>
                  <X size={16} />
                </HistoryBlock>
              </HeaderSearchContainer>
            </PopupContent>
          </PopupOverlay>
        )}
      </AnimatePresence>
    </>
  );
};
