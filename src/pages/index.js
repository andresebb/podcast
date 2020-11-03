import "isomorphic-fetch";
import Link from "next/link";
import Layout from "../components/Layout";
import ChannelGrid from "../components/ChannelGrid";
import Error from "next/error";

export async function getServerSideProps({ res }) {
  try {
    // Fetch data from external API
    const res = await fetch(`https://api.audioboom.com/channels/recommended`);
    const data = await res.json();

    // Pass data to the page via props
    return { props: { data, statusCode: 200 } };
  } catch (e) {
    res.statusCode = 503;
    return { props: { data: null, statusCode: 503 } };
  }
}

const index = ({ data, statusCode }) => {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <>
      <Layout title="Popcast">
        <ChannelGrid data={data} />
      </Layout>
    </>
  );
};

export default index;
