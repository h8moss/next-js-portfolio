import '../styles/globals.css'

import DarkModeProvider from '../components/DarkModeProvider';
import MainDarkModeConsumer from '../components/MainDarkModeConsumer/MainDarkModeConsumer';
import AuthContext from '../context/auth';
import AuthService from '../services/firebase/auth';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContext.Provider value={new AuthService()}>
      <DarkModeProvider>
        <MainDarkModeConsumer>
          <Component {...pageProps} />
        </MainDarkModeConsumer>
      </DarkModeProvider>
    </AuthContext.Provider>
  );
}

export default MyApp
