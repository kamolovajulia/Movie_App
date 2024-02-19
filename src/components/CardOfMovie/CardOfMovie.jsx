import React from 'react';

import { Card, Row, Col, Layout, Rate } from 'antd';
import style from './CardOfMovie.module.css';
import Poster from './Poster/Poster';
import GenresList from '../GenresList/GenresList';
import CircleRating from './CircleRating/CircleRating';

import { getFormattedTitle, getFormattedReleaseDate, getFormattedOverview } from '../../utils';

const { Header, Content } = Layout;

function CardOfMovie(props) {
  const { id, title, overview, release_date, poster_path, vote_average, addRating, genre_ids, rating = 0 } = props;

  return (
    <Col className={style.cardMovie} style={{ padding: 0 }}>
      <Card className={style.gridStyle} bodyStyle={{ padding: '0', width: '100%' }}>
        <Row className={style.row}>
          <Poster src={poster_path} />
          <Col className={style.wrapperLayoutCard}>
            <Layout className={style.layoutStyle}>
              <Header className={style.headerStyle}>
                <h5 className={style.titleStyle} title={title}>
                  {getFormattedTitle(title)}
                </h5>
                <CircleRating voted={vote_average} />
              </Header>
              <Content className={style.contentStyle}>
                <p className={style.releaseStyle}>{getFormattedReleaseDate(release_date)}</p>
                <GenresList genresOfMovie={genre_ids} className={style.genres} />
                <main className={style.mainContent}>
                  <p className={style.description}>{getFormattedOverview(overview)}</p>
                  <Rate
                    allowClear={false}
                    count={10}
                    value={rating}
                    onChange={(e) => addRating(id, e)}
                    className={style.rate}
                  />
                </main>
              </Content>
            </Layout>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
export default CardOfMovie;
