import Image from 'next/image';
import { styled } from 'styled-components';

export const ModalInnerContainer = styled.form`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const LogoIconBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TextInModal = styled.p`
  color: #000;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

export const LoginInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ForgotPasswordText = styled.p`
  color: #b91c1c;
  font-size: 16px;
  font-weight: 500;
  text-align: right;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  width: 100%;
  display: flex;
  padding: 12px 55px;
  justify-content: center;
  align-items: center;
  background-color: #171717;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

export const LoginWithAnotherActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const LoginWithAnotherAction = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #676767;
  gap: 8px;
`;

export const LoginWithAnotherActionIntroTextBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 221px 1fr;
  align-items: center;
  grid-gap: 10px;
`;

export const LoginWithAnotherActionText = styled.div`
  color: #676767;
  font-size: 16px;
  font-weight: 400;
`;

export const Line = styled.div`
  max-width: 95px;
  width: 100%;
  height: 1px;
  border: 0.5px solid #676767;
`;

export const SelectYourPreferencesText = styled.p`
  color: #171717;
  font-size: 20px;
  font-weight: 500;

  @media screen and (max-width: 576px) {
    font-size: 16px;
  }

  @media screen and (max-width: 419px) {
    font-size: 12px;
  }
`;

export const SelectYourPreferencesExtraInfoText = styled.p`
  color: #676767;
  font-size: 16px;
  font-weight: 400;

  @media screen and (max-width: 576px) {
    font-size: 12px;
  }
`;

export const SelectYourPreferencesBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SelectYourPreferencesInfoTextsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SelectYourPreferencesInfoImagesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

export const PreferenceBlock = styled.div<{ $active: boolean }>`
  max-width: 134px;
  width: 100%;
  height: 100%;
  position: relative;
  border: 2px solid ${({ $active }) => ($active ? '#171717' : 'transparent')};
`;

export const PreferenceBlockInnerText = styled.p`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  left: 10px;
  bottom: 10px;
`;

export const PreferenceBlockImage = styled(Image)`
  width: 134px;
  height: 137px;
  object-fit: cover;
`;

export const PreferenceBlockCheckbox = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;
