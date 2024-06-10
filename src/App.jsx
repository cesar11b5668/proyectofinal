import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getCharacters, getRandomCharacters } from './api/marvelapi';
import MarvelCard from './components/MarvelCard';
import './assets/css/index.css';

const App = () => {
  const [randomCharacters, setRandomCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    getRandomCharacters().then(setRandomCharacters);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    getCharacters(searchTerm).then(setSearchResults);
  };

  const openModal = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  const handleLogoClick = () => {
    setSearchTerm('');
    setSearchResults([]);
    getRandomCharacters().then(setRandomCharacters);
  };

  return (
    <div className="app">
      <header>
        <h1 onClick={handleLogoClick} style={{ cursor: 'pointer' }}>Personajes de Marvel</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar un personaje"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </header>
      <div className="card-container">
        {searchResults.length > 0
          ? searchResults.map((character) => (
              <MarvelCard key={character.id} character={character} openModal={openModal} />
            ))
          : randomCharacters.map((character) => (
              <MarvelCard key={character.id} character={character} openModal={openModal} />
            ))}
      </div>
      {selectedCharacter && (
        <Modal
          isOpen={!!selectedCharacter}
          onRequestClose={closeModal}
          contentLabel="Detalles del Personaje"
          className="custom-modal"
          overlayClassName="custom-overlay"
          ariaHideApp={false}
        >
          <div className="modal-header">
            <h2>{selectedCharacter.name}</h2>
            <button onClick={closeModal} className="close-button">&times;</button>
          </div>
          <div className="modal-body">
            <img src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`} alt={selectedCharacter.name} className="modal-image"/>
            <div className="modal-description">
              <p><strong>Descripción:</strong> {selectedCharacter.description || 'No hay descripción disponible'}</p>
              <p><strong>Cómics:</strong></p>
              <ul>
                {selectedCharacter.comics.items.map((comic) => (
                  <li key={comic.resourceURI}>{comic.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <button onClick={closeModal} className="modal-close-button">Cerrar</button>
        </Modal>
      )}
    </div>
  );
};

export default App;
