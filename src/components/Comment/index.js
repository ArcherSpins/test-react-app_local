import React from 'react';
import { format } from 'date-fns';

export default ({
  url = 'https://proosbb.com/demo/image/person.png',
  name,
  date = new Date(),
  content,
  id,
  deleteCommentAction
}) => (
  <div className="comment" style={{ position: 'relative' }}>
    <div className="avatar">
      <img src={url} alt="avatar" />
    </div>
    <div className="content">
      <a className="author" href="/">{name}</a>
      <div className="metadata">
        <div>{format(new Date(date), 'dd.MM.YYY hh:mm')}</div>
      </div>
      <div className="text">{content}</div>
    </div>
    <button onClick={() => deleteCommentAction(id)} className="btn btn-close">Удалить</button>
  </div>
)
