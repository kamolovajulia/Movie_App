import React from 'react';

import { Context } from '../App/App';

import { Space, Tag } from 'antd';

import style from './GenresList.module.css';

const GenresList = ({ genresOfMovie }) => (
  <Context.Consumer>
    {(genres) => {
      const genresList = genresOfMovie.map((item, index) => {
        if (index < 3) {
          for (let i = 0; i < genres.length; i++) {
            let itemGenre = genres[i];
            if (item === itemGenre.id) return <Tag>{itemGenre.name}</Tag>;
          }
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

export default GenresList;
