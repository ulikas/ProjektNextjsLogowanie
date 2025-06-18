import NavigationPanel from "../components/NavigationPanel";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <head>
        <title>OgłoszeniaWikzon</title>
        <meta
          name="description"
          content="SklepWikzon - Twoje miejsce na zakupy"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <NavigationPanel />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
