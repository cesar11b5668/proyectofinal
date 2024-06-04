import { useState, useEffect } from 'react';
import MarvelCard from './components/MarvelCard';
import { getCharacters, getRandomCharacters } from './api/marvelapi';
import './assets/css/index.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedCharacter, setSearchedCharacter] = useState('');

  const fetchRandomCharacters = async () => {
    setLoading(true);
    const randomCharacters = await getRandomCharacters();
    setCharacters(randomCharacters);
    setSearchedCharacter('');
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomCharacters();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const results = await getCharacters(searchTerm);
    setCharacters(results);
    setSearchedCharacter(searchTerm); // Update searched character name
    setLoading(false);
  };

  const handleTitleClick = () => {
    setSearchTerm('');
    fetchRandomCharacters();
  };

  return (
    <div className="app">
      <header>
        <h1 onClick={handleTitleClick} style={{ cursor: 'pointer' }}>Marvel Characters</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a character"
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
      </header>
      <h2>{searchedCharacter ? searchedCharacter : 'Random Characters'}</h2>
      <div className="card-container">
        {loading ? (
          <p>Loading...</p>
        ) : characters.length > 0 ? (
          characters.map((character) => (
            <MarvelCard key={character.id} character={character} />
          ))
        ) : (
          <p>No random characters available.</p>
        )}
      </div>
    </div>
  );
};

export default App;
