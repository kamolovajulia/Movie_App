import React from 'react';
import { Row } from 'antd';
import CardOfMovie from '../CardOfMovie/CardOfMovie';

const ListOfMovies = ({ dataList, addRating }) => {
  const elements = dataList.map((item) => {
    return <CardOfMovie key={item.id} {...item} addRating={addRating} />;
  });

  return (
    <Row gutter={[36, 37]} justify='space-between' style={{ width: '100%', margin: 0 }}>
      {elements}
    </Row>
  );
};

export default ListOfMovies;
