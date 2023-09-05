import React, { useState } from 'react';
import {
  AccordionContainer,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
} from './styles';
import { ChevronDown } from 'react-feather';

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionContainer>
      <AccordionHeader onClick={handleAccordionClick}>
        {title}
        <AccordionIcon $isOpen={isOpen}>
          <ChevronDown size={16} />
        </AccordionIcon>
      </AccordionHeader>
      {isOpen && (
        <AccordionContent $isOpen={isOpen}>{children}</AccordionContent>
      )}
    </AccordionContainer>
  );
};

export default Accordion;
