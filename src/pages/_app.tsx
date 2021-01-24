import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";

import "tailwindcss/tailwind.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>tenjify-web</title>
      </Head>

      <Component {...pageProps} />
      <footer className="text-center text-xs py-4">© 2020 DQN</footer>

      <style global jsx>{`
        html {
          font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue",
            "Yu Gothic", "YuGothic", Verdana, Meiryo, sans-serif;
        }
      `}</style>
    </>
  );
};

export default App;
