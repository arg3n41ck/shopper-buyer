import { styled } from 'styled-components';

export const ButtonWithBackground = styled.button<{
  $padding?: string;
  $width?: string;
  $background?: string;
}>`
  width: ${({ $width }) => ($width ? $width : 'fit-content')};
  background: ${({ $background }) => $background || 'none'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${({ $padding }) => $padding};
  border: ${({ $background }) => ($background ? 'none' : '1px solid #171717')};
  color: ${({ $background }) => ($background ? '#fff' : '#171717')};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
