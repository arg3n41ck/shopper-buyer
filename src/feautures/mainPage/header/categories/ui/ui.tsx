import React, { useState } from 'react';
import { Accordion } from '@/shared/ui/accordions';

interface Category {
  name: string;
  subcategories: string[];
}

interface HeaderProps {
  categories: Category[];
}

export const HeaderCategories: React.FC<HeaderProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const isSaleText = (text: string) => text === 'Распродажа';

  const handleCategoryHover = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  const handlePopupClose = () => {
    setActiveCategory(null);
  };

  return (
    <div className="flex items-center">
      <div className="flex md:hidden w-full flex-wrap ">
        {categories.map((category) => (
          <div
            key={category.name}
            onMouseEnter={() => handleCategoryHover(category.name)}
            onMouseLeave={handlePopupClose}
            className={`relative cursor-pointer py-3 pr-5 ${
              isSaleText(category.name) ? 'text-[#B91C1C]' : 'text-[#000]'
            } hover:underline`}
          >
            {category.name}
            {activeCategory === category.name && (
              <div className="w-full max-w-[1440px] h-[500px] border-t border-[#ececec] fixed left-1/2 transform -translate-x-1/2 mt-[12px] bg-[#fff] z-[11] text-[#000] flex flex-col items-start py-[36px] px-[48px] box-border">
                {category.subcategories.map((subcategory) => (
                  <div
                    key={subcategory}
                    className="mb-[10px] relative hover:underline"
                  >
                    {subcategory}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full flex-col-reverse hidden md:flex">
        {categories.map((category) => (
          <Accordion
            key={category.name}
            title={
              <div
                className={`relative cursor-pointer  ${
                  isSaleText(category.name) ? 'text-[#B91C1C]' : 'text-[#000]'
                } hover:underline`}
              >
                {category.name}
              </div>
            }
          >
            {category.subcategories.map((subcategory) => (
              <div className="mb-[10px] hover:underline" key={subcategory}>
                {subcategory}
              </div>
            ))}
          </Accordion>
        ))}
      </div>
    </div>
  );
};
