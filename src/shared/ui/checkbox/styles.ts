import styled from 'styled-components';
import * as palette from '@/shared/lib/consts/styles';

export const CheckboxWrapper = styled.label<{
  checked: boolean;
}>`
  display: flex;
  align-items: center;
  cursor: pointer;

  & > span {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    border: 2px solid ${palette.SHADES[100]};
    border-radius: 50%;
    background: ${({ checked }) => (checked ? palette.SHADES[100] : 'none')};

    &:after {
      content: '';
      display: ${(props) => (props.checked ? 'block' : 'none')};
      position: absolute;
      top: 1px;
      left: 5px;
      width: 6px;
      height: 11px;
      border: 1px solid ${palette.NEUTRAL[50]};
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  label {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: ${palette.SHADES[100]};
  }
`;
