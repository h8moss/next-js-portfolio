import "../styles/globals.css";

import DarkModeProvider from "../components/DarkModeProvider";
import MainDarkModeConsumer from "../components/MainDarkModeConsumer/MainDarkModeConsumer";

function MyApp({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <MainDarkModeConsumer>
        <Component {...pageProps} />
      </MainDarkModeConsumer>
    </DarkModeProvider>
  );
}

export default MyApp;
