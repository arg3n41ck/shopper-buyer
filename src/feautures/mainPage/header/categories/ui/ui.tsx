import React, { useState } from 'react';
import {
  CategoriesLaptopVersionContainer,
  CategoriesMobileVersionContainer,
  CategoryItem,
  HeaderContainer,
  SubcategoriesPopup,
  SubcategoryItem,
} from './styles';
import Accordion from '@/shared/ui/accordion';

interface Category {
  name: string;
  subcategories: string[];
}

interface HeaderProps {
  categories: Category[];
}

export const HeaderCategories: React.FC<HeaderProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryHover = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  const handlePopupClose = () => {
    setActiveCategory(null);
  };

  return (
    <HeaderContainer>
      <CategoriesLaptopVersionContainer>
        {categories.map((category) => (
          <CategoryItem
            key={category.name}
            onMouseEnter={() => handleCategoryHover(category.name)}
            onMouseLeave={handlePopupClose}
            $isSaleCategory={category.name === 'Распродажа'}
          >
            {category.name}
            {activeCategory === category.name && (
              <SubcategoriesPopup>
                {category.subcategories.map((subcategory) => (
                  <SubcategoryItem key={subcategory}>
                    {subcategory}
                  </SubcategoryItem>
                ))}
              </SubcategoriesPopup>
            )}
          </CategoryItem>
        ))}
      </CategoriesLaptopVersionContainer>

      <CategoriesMobileVersionContainer>
        {categories.map((category) => (
          <Accordion
            key={category.name}
            title={
              <CategoryItem $isSaleCategory={category.name === 'Распродажа'}>
                {category.name}
              </CategoryItem>
            }
          >
            {category.subcategories.map((subcategory) => (
              <SubcategoryItem key={subcategory}>{subcategory}</SubcategoryItem>
            ))}
          </Accordion>
        ))}
      </CategoriesMobileVersionContainer>
    </HeaderContainer>
  );
};
