import React from 'react';

import ListOfMovies from '../ListOfMovies/ListOfMovies';

import { Layout } from 'antd';
const { Content } = Layout;

const RatingList = (props) => (
  <>
    {props.state ? (
      <Content>
        <ListOfMovies dataList={props.state} />
      </Content>
    ) : null}
  </>
);

export default RatingList;
