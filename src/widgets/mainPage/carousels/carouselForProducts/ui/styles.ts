import { styled } from 'styled-components';

export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const SlideContainer = styled.div`
  position: relative;
`;

export const SliderHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const SliderHeaderMainText = styled.p`
  color: #171717;
  /* font-family: Jost; */
  font-size: 32px;
  font-weight: 500;
`;

export const SliderHeaderDescriptionText = styled.p`
  color: #676767;
  /* font-family: Jost; */
  font-size: 16px;
  font-weight: 400;
`;

export const MobileStyleOfButton = styled.div`
  display: flex;
  justify-content: center;
`;
