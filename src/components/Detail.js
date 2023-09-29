import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  fetchShowDetails, selectShowDetails, selectSeasons, selectShowDetailsStatus, selectShowDetailsError,
} from '../redux/shows_detail/showsDetailSlice';
import { MobileSeasonsHeader, WebHeader } from './navigation/Header';

const ShowDetails = () => {
  const { showId } = useParams();
  const dispatch = useDispatch();
  const show = useSelector(selectShowDetails);
  const seasons = useSelector(selectSeasons);
  const status = useSelector(selectShowDetailsStatus);
  const error = useSelector(selectShowDetailsError);

  useEffect(() => {
    dispatch(fetchShowDetails(showId));
  }, [dispatch, showId]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  if (!show) {
    return <div>No show details available.</div>;
  }

  return (
    <div className="App">
      <div className="webHeader">
        <WebHeader />
      </div>
      <div className="mobileHeader">
        <MobileSeasonsHeader />
      </div>

      <div className="SeasonsMain">
        <h1>{show.name}</h1>
        <i>{show.summary}</i>
      </div>
      <h2 id="SeasonsHeading">Seasons</h2>
      <ul className="SeasonsRender">
        {seasons.map((season) => (
          <li key={season.id}>
            <Link to={`/episodes/${showId}/${season.number}`}>
              {' '}
              <img src={season.image?.medium} alt={season.name} />
              {' '}
            </Link>

            <div className="SeasonsInfo">
              <b>
                Number of episodes:
                <br />
                {' '}
                {season.episodeOrder}
                {' '}
              </b>
            </div>

          </li>
        ))}
      </ul>
    </div>

  );
};

export default ShowDetails;
