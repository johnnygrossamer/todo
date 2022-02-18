import React from 'react';
import './app-header.css';

const AppHeader = ({toDo, done}) => {
  return (
    <div className="app-header flex-column">
      <h1>Список дел</h1>
      <h2>{toDo} еще активных, {done} выполнено</h2>
    </div>
  );
};

export default AppHeader;
