import { styled } from 'styled-components';

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
