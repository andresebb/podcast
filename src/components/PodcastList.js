import React from "react";
import Link from "next/link";
import Image from "next/image";

const PodcastList = ({ podcasts, modal }) => {
  return (
    <div>
      {podcasts.map((clip) => (
        <Link href={`/podcast?id=${clip.id}`} key={clip.id}>
          <a
            onClick={(event) => modal(event, clip)}
            key={clip.id}
            className="podcast"
          >
            <div className="">{clip.title}</div>
            <div className="play">
              <Image src="/playButton.svg" width={20} height={20} />
            </div>
          </a>
        </Link>
      ))}
      <style jsx>{`
        .podcast {
          display: block;
          text-decoration: none;
          color: #333;
          padding: 15px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
        }

        .play {
          display: flex;
          align-items: center;
          margin-left: 6px;
        }
        .podcast:hover {
          color: #000;
        }
        .podcast h3 {
          margin: 0;
        }
        .podcast .meta {
          color: #666;
          margin-top: 0.5em;
          font-size: 0.8em;
        }
      `}</style>
    </div>
  );
};

export default PodcastList;
