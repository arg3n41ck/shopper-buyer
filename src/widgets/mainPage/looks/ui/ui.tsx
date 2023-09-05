import React from 'react';
import {
  ImageContainer,
  LooksContainer,
  LooksDescriptionOne,
  LooksDescriptionTwo,
  LooksInfoBlock,
  LooksNameText,
} from './styles';
import { ArrowRight } from 'react-feather';
import { CustomButtonWithBackground } from '@/shared/ui/buttonWithoutBackground';
import { ImageFromNext, LaptopVersion } from '@/shared/styles/styles';

const Looks = () => {
  return (
    <LooksContainer>
      <LooksInfoBlock>
        <LooksNameText>Летние образы</LooksNameText>
        <LooksDescriptionOne>
          Бикини, босоножки, топы, шорты и многое другое
        </LooksDescriptionOne>
        <LooksDescriptionTwo>
          Измените свои планы на лето с помощью этих ключевых летних вещей
        </LooksDescriptionTwo>

        <LaptopVersion>
          <CustomButtonWithBackground className={`mt-8`}>
            Смотреть подборку
            <ArrowRight />
          </CustomButtonWithBackground>
        </LaptopVersion>
      </LooksInfoBlock>

      <ImageContainer>
        <ImageFromNext
          src={'/party.png'}
          width={656}
          height={440}
          alt="party"
          layout="responsive"
        />
      </ImageContainer>
    </LooksContainer>
  );
};

export default Looks;
