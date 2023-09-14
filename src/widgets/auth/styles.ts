import * as palette from '@/shared/lib/consts/styles';
import styled from 'styled-components';

export const TextFieldCont = styled.div`
  margin: 0 auto;
  max-width: 346px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ButtonCont = styled.div`
  margin: 20px 0 62px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ButtonInfoCont = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const HeadingText = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  color: ${palette.SHADES[100]};
  margin-bottom: 20px;
  text-align: center;
`;

export const FooterText = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${palette.NEUTRAL[500]};
`;

export const PasswordHandlerCont = styled.div<{ $error?: boolean | undefined }>`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ $error }) =>
    $error ? palette.SUCCESS[700] : palette.NEUTRAL[500]};

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }
`;