import { styled } from 'styled-components';

export const LooksContainer = styled.div`
  width: 100%;
  /* height: 440px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const LooksInfoBlock = styled.div`
  max-width: 504px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(
    270deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.71) 5.73%,
    #fff 100%
  );
`;

export const ImageContainer = styled.div`
  width: 584px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const LooksNameText = styled.p`
  color: #171717;
  /* font-family: Jost; */
  font-size: 36px;
  font-weight: 500;
`;

export const LooksDescriptionOne = styled.p`
  color: #171717;
  /* font-family: Jost; */
  font-size: 20px;
  font-weight: 400;
`;

export const LooksDescriptionTwo = styled.p`
  color: #676767;
  /* font-family: Jost; */
  font-size: 16px;
  font-weight: 400;
`;

export const LooksCheckButton = styled.button`
  width: fit-content;
  display: flex;
  gap: 8px;
  padding: 12px 55px;
  border: 1px solid #171717;
  color: #171717;
  /* font-family: Jost; */
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
