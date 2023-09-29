import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchEpisodes, selectEpisodes, selectEpisodesStatus, selectEpisodesError,
} from '../redux/shows_detail/episodesSlice';
import { MobileSeasonsHeader, WebHeader } from './navigation/Header';

const EpisodeList = () => {
  const { showId } = useParams();
  const dispatch = useDispatch();
  const episodes = useSelector(selectEpisodes);
  const episodesCount = episodes.length;
  const status = useSelector(selectEpisodesStatus);
  const error = useSelector(selectEpisodesError);
  const regularEpisodes = episodes.filter((show) => show.type === 'regular');
  const regularEpisodesCount = regularEpisodes.length;

  useEffect(() => {
    dispatch(fetchEpisodes(showId));
  }, [dispatch, showId]);

  if (status === 'loading') {
    return <div>Loading episodes...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  if (episodes.length === 0) {
    return <div>No episodes available.</div>;
  }

  return (
    <div className="EpisodeList">
      <div className="mobileHeader">
        <MobileSeasonsHeader />
      </div>
      <div className="webHeader">
        <WebHeader />
      </div>
      <div className="mobileHeaderExtension">
        <div className="extensionChildMain">
          <span>
            {' '}
            <b>
              {episodesCount}
              {' '}
              <br />
              total episodes
            </b>
            {' '}
            <b>
              {regularEpisodesCount}
              {' '}
              <br />
              {' '}
              total Regular Episodes
              {' '}
            </b>
            {' '}
            <b>
              0
              <br />
              {' '}
              Total Irregular Episodes
              {' '}
            </b>
          </span>
        </div>
      </div>
      <h3>Episodes</h3>
      <ul className="EpisodesRender">
        {episodes.map((episode) => (
          <li key={episode.id}>

            <img src={episode.image?.medium} alt={episode.name} />
            <br />
            <span>
              {episode.name}
              {' '}
              <br />
              Season
              {' '}
              {episode.season}
              {' '}
              Episode
              {' '}
              {episode.number}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
