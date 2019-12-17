import React from 'react';
import { Link } from 'react-router-dom';

export default ({
  url = 'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
  id,
  title,
  commentsLength,
  shortDescription
}) => (
  <div className="item">
    <div className="ui tiny image">
      <img src={url} alt="post" />
    </div>
    <div className="content">
      <div className="header">
        <Link to={'posts/' + id}>{title}</Link>
      </div>
      <div className="description">
        {
          shortDescription || (
            <img
              src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png"
              className="ui image"
              alt="short description"
            />
          )
        }
      </div>
    </div>
    <p>Комментариев: {commentsLength || 0}</p>
  </div>
)
