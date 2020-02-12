import React from 'react'

//Estilos pertinentes ao componente
import './style.css';

function DevItem({ dev }){
  //JSX
  return (
    <li className="dev-item">
    <header>
      <img src={dev.avatar_url} alt={dev.name}/>
      <div className="user-info">
        <strong>{dev.name}</strong>
        <span>{dev.techs.join(', ')}</span>
      </div>
    </header>
    <p>{dev.bio}</p>
    <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
  </li>
  );
}

export default DevItem;