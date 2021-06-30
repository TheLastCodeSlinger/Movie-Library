import "./ExternalLinks.css";
import "./Modal.scss";

import { Fragment, useState } from "react";
import ModalVideo from "react-modal-video";

//url contains information about external-sources (used in MovieDetails)

export const Trailer = (url) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let trailer;
  //It's an array with different types of videos. This function looks for a trailer. Filter should also work here.
  if (url.url.results) {
    for (const key of url.url.results) {
      if (key.type === "Trailer") {
        trailer = key.key;
        break;
      }
    }
  }

  let modal;
  //If a trailer has been found, then the modalbutton will be rendered.
  if (trailer) {
    modal = (
      <Fragment>
        <button onClick={() => setIsModalOpen(true)} className="link">
          TRAILER
        </button>
        <ModalVideo
          channel="youtube"
          isOpen={isModalOpen}
          videoId={trailer}
          onClose={() => setIsModalOpen(false)}
        />
      </Fragment>
    );
  }

  return  <Fragment>
            {modal}
          </Fragment>;
};

export const ExternalHomePage = (url) => {
  return (
    <Fragment>
      {url.url ? (
        <a className="link" href={url.url} target="_blank" rel="noreferrer">
          HOMEPAGE
        </a>
      ) : null}
    </Fragment>
  );
};

export const Imdb = (url) => {
  return (
    <Fragment>
      {url.url ? (
        <a
          className="link"
          href={`https://www.themoviedb.org/movie/${url.url}`}
          target="_blank"
          rel="noreferrer"
        >
          IMDB
        </a>
      ) : null}
    </Fragment>
  );
};
