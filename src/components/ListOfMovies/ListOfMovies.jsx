import React from 'react';

import { Row } from 'antd';

import CardOfMovie from '../CardOfMovie/CardOfMovie';

function ListOfMovies({ dataList, addRating }) {
  const elements = dataList.map((item) => <CardOfMovie key={item.id} {...item} addRating={addRating} />);

  return (
    <Row gutter={[36, 37]} justify="space-between" style={{ width: '100%', margin: 0 }}>
      {elements}
    </Row>
  );
}

export default ListOfMovies;
