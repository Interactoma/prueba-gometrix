import React from 'react';

const Dropdown = ({ characters = [], onSelect }) => (
  <select onChange={(e) => onSelect(e.target.value)} defaultValue="">
    <option value="" disabled>Selecciona un personaje</option>
    {characters.map((character) => (
      <option key={character.id} value={character.id}>
        {character.name}
      </option>
    ))}
  </select>
);

export default Dropdown;
