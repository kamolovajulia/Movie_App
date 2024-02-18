import React from 'react';

import { Col, Image, Empty } from 'antd';

import style from './Poster.module.css';

const Poster = ({ src }) => (
  <Col className={style.wrapperPoster}>
    {src ? (
      <Image className={style.poster} src={`https://image.tmdb.org/t/p/original${src}`} />
    ) : (
      <Empty description={false} />
    )}
  </Col>
);

export default Poster;
