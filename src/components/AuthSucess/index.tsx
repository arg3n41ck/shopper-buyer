import React, { FC } from 'react';
import { SUCCESS } from '@/shared/lib/consts/styles';
import { PATH_AUTH } from '@/shared/routes/paths';
import { useRouter } from 'next/router';
import { Check } from 'react-feather';
import { Trans } from 'react-i18next';
import Button from '../../shared/ui/button';
import AuthLayout from '../layouts/authLayout/authLayout';
import {
  CheckBackground,
  CheckCircleIconCont,
  CheckIconBlock,
  HeaderText,
  SuccessActionCont,
} from './styles';

const SuccessAction: FC = () => {
  const router = useRouter();
  const title = (router.query?.title as string) || '';
  const path = (router.query?.path as string) || '';

  const navigateToPersonalCabinet = () =>
    router.push({ pathname: path ? path : PATH_AUTH.root });

  return (
    <AuthLayout>
      <SuccessActionCont>
        <HeaderText>{title}</HeaderText>

        <CheckCircleIconCont>
          <CheckBackground />

          <CheckIconBlock>
            <Check size={80} color={SUCCESS[500]} />
          </CheckIconBlock>
        </CheckCircleIconCont>

        <Button onClick={navigateToPersonalCabinet}>
          <Trans i18nKey={'auth.authSuccessPage.toLKPage'} />
        </Button>
      </SuccessActionCont>
    </AuthLayout>
  );
};

export default SuccessAction;
