import { ChevronLeft } from 'react-feather';
import styled from 'styled-components';

export const SlideContainer = styled.div`
  width: 100%;
  height: 584px;
  position: relative;
  overflow: hidden;
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 584px;
  object-fit: cover;
`;

export const CustomPagination = styled.div`
  width: max-content !important;
  bottom: 15% !important;
  left: 12% !important;

  .swiper-pagination-bullet {
    width: 80px;
    height: 4px;
    border-radius: 0;
    background: #171717;
    margin-right: 4px;
  }

  @media screen and (max-width: 768px) {
    bottom: 10px !important;
    left: 10px !important;
  }
`;

export const CustomPrevButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  font-size: 18px;
  width: 72px;
  height: 72px;
  background-color: #171717;
  color: #fff;
  border: none;
  cursor: pointer;
  z-index: 10;
`;

export const CustomNextButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 18px;
  width: 72px;
  height: 72px;
  background-color: #171717;
  color: #fff;
  border: none;
  cursor: pointer;
  z-index: 10;
`;
