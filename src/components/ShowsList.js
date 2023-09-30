import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchShows, selectAllShows, selectShowsStatus, selectShowsError,
} from '../redux/shows_list/listShowsSlice';
import { WebHeader, MobileHomeHeader } from './navigation/Header';

const ShowList = () => {
  const dispatch = useDispatch();
  const shows = useSelector(selectAllShows);
  const status = useSelector(selectShowsStatus);
  const error = useSelector(selectShowsError);
  const totalCount = shows.length;
  const endedShows = shows.filter((show) => show.status === 'Ended');
  const endedShowsCount = endedShows.length;
  const runningShows = shows.filter((show) => show.status === 'Running');
  const runningShowsCount = runningShows.length;
  const [searchInput, setSearchInput] = useState('');

  const filteredShows = shows.filter((show) => show.name.toLowerCase().includes(searchInput.toLowerCase()));

  useEffect(() => {
    dispatch(fetchShows());
  }, [dispatch]);

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

  return (
    <div className="App">

      <div className="webHeader">
        <WebHeader />
        <input
          type="text"
          placeholder="Search here..."
          className="webSearch"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="mobileHeader">
        <MobileHomeHeader />
      </div>

      <div className="mobileHeaderExtension">
        <div className="extensionChildMain">
          <h1>Home</h1>
          <span>
            <b>
              {' '}
              {totalCount}
              {' '}
              <br />
              {' '}
              total shows
              {' '}
            </b>
            <b>
              {' '}
              {endedShowsCount}
              {' '}
              <br />
              {' '}
              completed shows
              {' '}
            </b>
            <b>
              {runningShowsCount}
              {' '}
              <br />
              {' '}
              ongoing shows
              {' '}
            </b>
          </span>
        </div>

        <div className="extensionChildSub">
          <span>
            <i>Suggested</i>
            {' '}
            <a>learn More</a>
          </span>
        </div>
      </div>

      <h1 className="webHeader">Home</h1>
      <ul className="Shows">
        {filteredShows.map((show) => (
          <div key={show.id} className="mObjectContainer">
            <li>
              <div className="ShowsItems">
                <Link to={`/show/${show.id}/seasons`}>
                  <img src={show.image?.medium} alt={show.name} />
                </Link>
                <div className="ShowsItemsInfo">
                  <span>
                    Rating: &nbsp;
                    <i>
                      {show.rating.average}
                      {' '}
                    </i>
                  </span>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
