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
      </div>
      <div className="mobileHeader">
        <MobileHomeHeader />
      </div>
      <input
        type="text"
        placeholder="Search shows..."
        className="webSearch"
        onChange={(e) => setSearchInput(e.target.value)}
      />

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
                <img src={show.image?.medium} alt={show.name} />
                {' '}
                <br />
                <div className="ShowsItemsInfo">
                  <Link to={`/show/${show.id}/seasons`}>
                    {' '}
                    <b>
                      {show.name}
                      {' '}
                    </b>
                  </Link>
                  {' '}
                  <br />
                  <span>
                    Rating:
                    <i>
                      {show.rating.average}
                      {' '}
                    </i>
                  </span>
                  {' '}
                  <span>
                    Show Status:
                    <i>
                      {' '}
                      {show.status}
                      {' '}
                    </i>
                  </span>
                  <br />
                  {' '}
                  <span>
                    Premier Date:
                    <i>{show.premiered}</i>
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
