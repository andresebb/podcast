import React, { useState } from "react";
import Link from "next/link";
import PodcastList from "../components/PodcastList";
import Layout from "../components/Layout";
import PodcastPLayer from "../components/PodcastPlayer";

export async function getServerSideProps({ query }) {
  let idChannel = query.id;

  let [reqChannel, reqSeries, reqAudios] = await Promise.all([
    fetch(`https://api.audioboom.com/channels/${idChannel}`),
    fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
    fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
  ]);

  let [dataChannel, dataSeries, dataAudios] = await Promise.all([
    await reqChannel.json(),
    await reqSeries.json(),
    await reqAudios.json(),
  ]);

  let channel = dataChannel.body.channel;
  let series = dataSeries.body.channels;
  let audioClips = dataAudios.body.audio_clips;

  return { props: { channel, audioClips, series } };
}

const channel = ({ channel, audioClips, series }) => {
  const [openPodcast, setOpenPodcast] = useState(null);

  const modal = (event, podcast) => {
    event.preventDefault();
    setOpenPodcast(podcast);
  };

  const closeModal = (event) => {
    event.preventDefault();
    setOpenPodcast(null);
  };

  return (
    <Layout title={channel.title}>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${channel.urls.banner_image.original})`,
        }}
      />

      {openPodcast && (
        <div className="modal">
          <PodcastPLayer clip={openPodcast} closeModal={closeModal} />
        </div>
      )}

      <h1>{channel.title}</h1>

      {series.length > 0 && (
        <div>
          <h2>Series</h2>
          <div className="channels">
            {series.map((serie) => (
              <Link href={`/channel?id=${serie.id}`} key={series.id} prefetch>
                <a className="channel">
                  <img src={serie.urls.logo_image.original} alt="" />
                  <h2>{serie.title}</h2>
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}

      <h2>Ultimos Podcasts</h2>
      <PodcastList podcasts={audioClips} modal={modal} />

      <style jsx>{`
        header {
          color: #fff;
          background: #8756ca;
          padding: 15px;
          text-align: center;
        }

        .banner {
          width: 100%;
          padding-bottom: 25%;
          background-position: 50% 50%;
          background-size: cover;
          background-color: #aaa;
        }

        .channels {
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }
        a.channel {
          display: block;
          margin-bottom: 0.5em;
          color: #333;
          text-decoration: none;
        }
        .channel img {
          border-radius: 3px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          width: 100%;
        }
        h1 {
          font-weight: 600;
          padding: 15px;
        }
        h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
          background: #8756ca;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: system-ui;
          background: white;
        }
      `}</style>
    </Layout>
  );
};

export default channel;
