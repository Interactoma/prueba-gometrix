import React, { useEffect, useState, createContext, useContext } from 'react';
import Swal from 'sweetalert2';
import { fetchCharacters } from './services/api';
import Dropdown from './components/Dropdown';
import CharacterCard from './components/CharacterCard';
import './styles/App.sass';

const CharacterContext = createContext();

const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadCharacters = async (page) => {
      const data = await fetchCharacters(page);
      setCharacters(data.results);
      setPageInfo(data.info);
    };
    loadCharacters(currentPage);
  }, [currentPage]);

  return (
    <CharacterContext.Provider value={{ characters, pageInfo, currentPage, setCurrentPage }}>
      {children}
    </CharacterContext.Provider>
  );
};

const App = () => {
  const { characters, pageInfo, currentPage, setCurrentPage } = useContext(CharacterContext);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [displayedCharacters, setDisplayedCharacters] = useState([]);
  const [internalPage, setInternalPage] = useState(1);

  useEffect(() => {
    if (internalPage === 1) {
      setDisplayedCharacters(characters.slice(0, 10));
    } else {
      setDisplayedCharacters(characters.slice(10, 20));
    }
    setSelectedCharacter(null);
  }, [characters, internalPage]);

  const handleSelectCharacter = (id) => {
    const character = characters.find((char) => char.id === parseInt(id));
    if (character) {
      setSelectedCharacter(character);
    } else {
      setSelectedCharacter(null);
    }
  };

  const handleNextPage = () => {
    if (internalPage === 1 && characters.length > 10) {
      setInternalPage(2);
    } else if (pageInfo?.next) {
      setCurrentPage(currentPage + 1);
      setInternalPage(1);
    }
    document.querySelector('select').value = '';
  };

  const handlePrevPage = () => {
    if (internalPage === 2) {
      setInternalPage(1);
    } else if (pageInfo?.prev) {
      setCurrentPage(currentPage - 1);
      setInternalPage(2);
    }
    document.querySelector('select').value = '';
  };

  const handleCharacterClick = (character) => {
    Swal.fire({
      title: character.name,
      text: `Estado: ${character.status}\nEspecie: ${character.species}\nGénero: ${character.gender}\nOrigen: ${character.origin.name}\nUbicación: ${character.location.name}`,
      imageUrl: character.image,
      imageWidth: 400,
      imageHeight: 'auto',
      imageAlt: character.name,
      confirmButtonText: 'Cerrar'
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Personajes de Rick y Morty</h1>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={!pageInfo?.prev && internalPage === 1}>
            Anterior
          </button>
          <span>
            Página {currentPage * 2 - (2 - internalPage)} de {pageInfo?.pages * 2 || 0}
          </span>
          <button onClick={handleNextPage} disabled={!pageInfo?.next && internalPage === 2}>
            Siguiente
          </button>
        </div>
        <Dropdown characters={Array.isArray(displayedCharacters) ? displayedCharacters : []} onSelect={handleSelectCharacter} />
        {selectedCharacter && (
          <div className="character-card-container">
            <CharacterCard character={selectedCharacter} onClick={handleCharacterClick} />
          </div>
        )}
      </header>
    </div>
  );
};

const AppWrapper = () => (
  <CharacterProvider>
    <App />
  </CharacterProvider>
);

export default AppWrapper;
