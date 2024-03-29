import React from 'react';
import { WithQuery } from '@/app/providers/withQuery';
import { TPagesProps } from '@/shared/lib/types/app';

interface WithProvidersProps {
  children: React.ReactNode;
  pageProps: TPagesProps;
}
export const WithProviders = ({ children, pageProps }: WithProvidersProps) => {
  return <WithQuery pageProps={pageProps}>{children}</WithQuery>;
};
