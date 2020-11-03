import React from "react";
import Link from "next/link";
const ChannelGrid = ({ data }) => {
  return (
    <div>
      <div className="channels">
        {data.body.map((channel) => (
          <Link href={`/channel?id=${channel.id}`} key={channel.id}>
            <a className="channel">
              <img src={channel.urls.logo_image.original} alt="" />
              <h2>{channel.title}</h2>
            </a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .channels {
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          background: #273b48;
        }
        a.channel {
          display: block;
          margin-bottom: 0.5em;
          text-decoration: none;
        }
        .channel img {
          border-radius: 3px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          width: 100%;
        }
        h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          color: white;
          margin: 0;
          text-align: center;
        }
        :global(div p) {
          /* Todos los p que esten adentro de un div resiven este estilo */
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ChannelGrid;
