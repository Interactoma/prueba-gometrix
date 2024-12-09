import React from 'react';

const CharacterCard = ({ character, onClick }) => (
  <div className="character-card" onClick={() => onClick(character)}>
    <img src={character.image} alt={character.name} />
    <h3>{character.name}</h3>
  </div>
);

export default CharacterCard;
