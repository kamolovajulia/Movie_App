import React from 'react';

import { Layout, Input, Spin, Pagination } from 'antd';

import ListOfMovies from '../ListOfMovies/ListOfMovies';
import Message from '../MessageComponent/Message';

import style from './SearchContent.module.css';

const { Content } = Layout;

function SearchContent({ state, searchName, genres, addRating, getMovies }) {
  return (
    <Content className={style.content}>
      <Input placeholder="Type to search..." onInput={searchName} className={style.searchInput} />
      {state.isFetching ? <Spin /> : null}
      <ListOfMovies
        dataList={state.elements}
        url={state.url}
        addRating={addRating}
        genres={genres}
      />
      {state.message ? <Message /> : null}
      {state.elements.length > 0 ? (
        <Pagination
          onChange={(e) => getMovies(e)}
          defaultCurrent={1}
          total={500}
          pageSizeOptions={[10]}
          showSizeChanger={false}
          className={style.pagination}
        />
      ) : null}
    </Content>
  );
}

export default SearchContent;
