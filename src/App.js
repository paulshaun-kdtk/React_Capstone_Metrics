import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ShowList from './components/ShowsList';
import ShowDetails from './components/Detail';
import EpisodeList from './components/Episodes';
import './App.css';
import './components/Main.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ShowList />} />
          <Route path="/show/:showId/seasons" element={<ShowDetails />} />
          <Route path="/episodes/:showId/:seasonNumber" element={<EpisodeList />} />
          {/* <Route path="/show/seasons/episodes" element={<Profile />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
