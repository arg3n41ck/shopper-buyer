import { styled } from 'styled-components';

export const ForSomeoneFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ForSomeoneFilterButton = styled.button<{ $active: boolean }>`
  color: #171717;
  /* font-family: Jost; */
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  text-transform: uppercase;
`;
