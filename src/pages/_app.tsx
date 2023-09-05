// pages/_app.js
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '@/shared/store';
import { AppPropsType } from 'next/dist/shared/lib/utils';
import '@/localization';
import '@/app/index.scss';

function App({ Component, pageProps }: AppPropsType) {
  return (
    <Provider store={store}>
      <div className="main-container">
        <ToastContainer
          position="top-right"
          autoClose={2000}
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
    </Provider>
  );
}

export default App;
