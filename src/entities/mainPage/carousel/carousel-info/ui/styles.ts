import styled from 'styled-components';

export const CarouselInfoContainer = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  z-index: 2;
  /* padding: 80px 0 0 12%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 12%;
  background-color: rgba(255, 255, 255, 0.7);

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 43%;
    bottom: 0;
    padding: 10px;
  }
`;

export const SliderTitle = styled.h2`
  font-size: 40px;
  font-weight: 600;
  line-height: 58px;
  color: #171717;

  margin-top: 32px;

  @media screen and (max-width: 768px) {
    margin-top: 0;
    font-size: 20px;
  }
`;

export const SlideDescription = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 29px;
  color: #676767;

  margin-top: 12px;

  @media screen and (max-width: 768px) {
    margin-top: 0;
    font-size: 16px;
  }
`;

export const SlideButton = styled.button`
  color: #171717;
  font-size: 20px;
  font-weight: 500;
  line-height: 34px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const SlideButtonBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  margin-top: 32px;

  @media screen and (max-width: 768px) {
    margin-top: 0;
  }
`;

export const ShopsLogo = styled.img`
  width: 132px;
  height: 64px;
  object-fit: contain;

  @media screen and (max-width: 768px) {
    width: 58px;
    height: 28px;
  }
`;
