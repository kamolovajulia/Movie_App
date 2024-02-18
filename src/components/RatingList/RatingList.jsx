import React from 'react';

import { Layout } from 'antd';
import ListOfMovies from '../ListOfMovies/ListOfMovies';

const { Content } = Layout;

const RatingList = ({ state }) => (
  <Content>
    {state ? (
      <ListOfMovies dataList={state} />
    ) : null}
  </Content>
);

export default RatingList;
