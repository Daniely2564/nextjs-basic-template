import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Layout from "../src/layouts/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout user={pageProps.user}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
