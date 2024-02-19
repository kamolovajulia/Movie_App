import React from 'react';

import { Layout } from 'antd';
import ListOfMovies from '../ListOfMovies/ListOfMovies';

const { Content } = Layout;

function RatingList({ state }) {
  return (
    <Content>
      {state
        ? <ListOfMovies dataList={state} />
        : null}
    </Content>
  );
}

export default RatingList;
