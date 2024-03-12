import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Join Video  Call</title>
      </Head>

      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
