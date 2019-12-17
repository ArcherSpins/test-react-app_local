import React from 'react';

export default ({ onSearch, onOpen }) => (
  <header className="d-flex justify-content-between align-items-center">
    <div className="ui input flex mr-20">
      <input onChange={(e) => onSearch(e.target.value)} className="d-block w-100" placeholder="Поиск.." />
    </div>
    <div>
      <button onClick={onOpen} type="button" className="ui primary button">Добавить пост</button>
    </div>
  </header>
)
