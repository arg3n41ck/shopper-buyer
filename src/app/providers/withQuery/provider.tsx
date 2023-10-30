import React from 'react';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TPagesProps } from '@/shared/lib/types/app';

const config = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: Infinity,
    },
  },
};

interface WithQueryProps {
  children: React.ReactNode;
  pageProps: TPagesProps;
}

export const WithQuery = ({ children, pageProps }: WithQueryProps) => {
  const [queryClient] = React.useState(() => new QueryClient(config));

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
};
