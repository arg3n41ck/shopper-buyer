import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppPropsType } from 'next/dist/shared/lib/utils';
import '@/shared/config/localization';
import '@/app/index.scss';
import { Jost } from 'next/font/google';
import { WithProviders } from '@/app/providers';

const jost = Jost({
  weight: ['400', '500', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
});

function App({ Component, pageProps }: AppPropsType) {
  return (
    <WithProviders pageProps={pageProps}>
      <div className={jost.className}>
        <div className="">
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Component {...pageProps} />
        </div>
      </div>
    </WithProviders>
  );
}

export default App;
