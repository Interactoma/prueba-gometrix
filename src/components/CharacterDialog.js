import React from 'react';
import './CharacterDialog.sass';

const CharacterDialog = ({ character, onClose }) => {
  if (!character) return null;

  return (
    <div className="dialog">
      <div className="dialog-content">
        <h2>{character.name}</h2>
        <ul>
          <li><strong>Estado:</strong> {character.status}</li>
          <li><strong>Especie:</strong> {character.species}</li>
          <li><strong>Género:</strong> {character.gender}</li>
          <li><strong>Origen:</strong> {character.origin.name}</li>
          <li><strong>Ubicación:</strong> {character.location.name}</li>
        </ul>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default CharacterDialog;
