import '../styles/globals.css'

import AuthContext from '../context/auth';
import AuthService from '../services/firebase/auth';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContext.Provider value={new AuthService()}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp
