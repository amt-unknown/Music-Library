import { useState, useRef, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery'
import Searchbar from './components/Searchbar';
import { DataContext } from './context/DataContext';
import { SearchContext } from './context/SearchContext';
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView';
import './App.css';

function App() {
  // let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='


  const handleSearch = (e, term) => {
    e.preventDefault()

    const fetchData = async () => {
      document.title = `${term} Music`
      const response = await fetch(API_URL + term)
      const resData = await response.json()
      if (resData.results.length > 0){
        return setData(resData.results)
      } else {
        return setMessage('Not Found')
      }
    }
    fetchData()
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={
            <Fragment>
              {message}
              <SearchContext.Provider value={{
                term: searchInput,
                handleSearch: handleSearch
                }}>
                <Searchbar />
              </SearchContext.Provider>
              <DataContext.Provider value={data}>
                <Gallery />
              </DataContext.Provider>
            </Fragment>
          }/>
          <Route path='/album/:id' element={<AlbumView />} />
          <Route path='/artist/:id' element={<ArtistView />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
