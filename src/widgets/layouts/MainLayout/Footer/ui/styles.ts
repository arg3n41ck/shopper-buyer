import { styled } from 'styled-components';

export const MainFooterContainer = styled.div`
  width: 100%;
  background-color: #f8f8f8;
  margin-top: 80px;
`;

export const FooterInfoContainer = styled.div`
  padding: 52px 48px;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: space-between;
  border-top: 1px solid #dbdbdb;
  width: 90%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 52px 20px;
  }
`;

export const FooterInfoColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FooterInfoColumnInnerTextsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FooterInfoHeadText = styled.p`
  color: #171717;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const FooterInfoIconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const FooterInfoChildText = styled.p`
  color: #676767;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
`;

export const FooterBottomInfo = styled.div`
  padding: 16px 48px;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  border-top: 1px solid #dbdbdb;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    padding: 16px 20px;
  }
`;

export const FooterBottomInfoText = styled.p`
  color: #676767;
  font-size: 16px;
  font-weight: 400;
`;

export const FooterTextAndIconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
