import React from 'react';

import ListOfMovies from '../ListOfMovies/ListOfMovies';
import Message from '../MessageComponent/Message';

import { Layout, Input, Spin, Pagination } from 'antd';

import style from './SearchContent.module.css';

const { Content } = Layout;

const SearchContent = (props) => (
  <Content className={style.content}>
    <Input placeholder='Type to search...' onInput={props.searchName} className={style.searchInput} />
    {props.state.isFetching ? <Spin></Spin> : null}
    <ListOfMovies
      dataList={props.state.elements}
      url={props.state.url}
      addRating={props.addRating}
      genres={props.genres}
    />
    {props.state.message ? <Message /> : null}
    {props.state.elements.length > 0 ? (
      <Pagination
        onChange={(e) => this.getMovies(e)}
        defaultCurrent={1}
        total={500}
        pageSizeOptions={[10]}
        showSizeChanger={false}
        style={{ marginTop: '37px' }}
      />
    ) : null}
  </Content>
);

export default SearchContent;
