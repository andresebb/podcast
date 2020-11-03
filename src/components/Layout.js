import React from "react";
import Link from "next/link";
import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Layout = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <header>
        <Link href="/">
          <a>Podcasts</a>
        </Link>
      </header>
      {children}
      <style jsx>{`
        header {
          color: #fff;
          background: #8756ca;
          padding: 15px;
          text-align: center;
        }

        header a {
          color: #fff;
          text-decoration: none;
          font-size: 24px;
          font-family: system-ui;
        }
      `}</style>
      <style jsx global>{`
        body {
          /* Estos son estilos globales*/
          background: white;
          font-family: system-ui;
          margin: 0;
        }

        /* Make clicks pass-through Nprogress styles */
        #nprogress {
          pointer-events: none;
        }

        #nprogress .bar {
          background: #29d;

          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;

          width: 100%;
          height: 2px;
        }

        /* Fancy blur effect */
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px #29d, 0 0 5px #29d;
          opacity: 1;

          -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
        }

        /* Remove these to get rid of the spinner */
        #nprogress .spinner {
          display: block;
          position: fixed;
          z-index: 1031;
          top: 15px;
          right: 15px;
        }

        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;

          border: solid 2px transparent;
          border-top-color: #29d;
          border-left-color: #29d;
          border-radius: 50%;

          -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
        }

        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }

        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }

        @-webkit-keyframes nprogress-spinner {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes nprogress-spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
