import React from 'react';

import { Space, Tag } from 'antd';
import { Context } from '../../App/App';

import style from './GenresList.module.css';

function GenresList({ genresOfMovie }) {
  return (
    <Context.Consumer>
      {(genres) => {
        const genresList = genresOfMovie.map((item, index) => {
          if (index < 3) {
            return genres.map((itemGenre) => (item === itemGenre.id) && (<Tag>{itemGenre.name}</Tag>));
          }
        });

        return (
          <div className={style.genres}>
            <Space size={[0, 8]} className={style.genresList}>
              {genresList}
            </Space>
          </div>
        );
      }}
    </Context.Consumer>
  );
}

export default GenresList;
