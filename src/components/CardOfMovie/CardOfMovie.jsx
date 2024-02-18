import React from 'react';

import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

import { Card, Row, Col, Layout, Rate } from 'antd';
import style from './CardOfMovie.module.css';
import Poster from './Poster/Poster';
import GenresList from '../GenresList/GenresList';
import CircleRating from './CircleRating/CircleRating';

const { Header, Content } = Layout;

function CardOfMovie(props) {
  const { id, title, overview, release_date, poster_path, vote_average, addRating, genre_ids, rating = 0 } = props;
  let release = '';
  if (release_date) {
    const data = release_date.replace(/-/g, ', ');
    release = format(new Date(data), 'MMMM dd, yyyy', { locale: enGB });
  }
  let text = [...overview];
  if (text.length > 210) {
    text = text.slice(0, 210);
    text = text.join('');
    text = text.split(' ');
    text.pop();
    text.push('...');
    text = text.join(' ');
  }

  const showTitle = (title) => {
    if (title.length > 21) {
      let newTitle = title.slice(0, 20);
      newTitle = newTitle.split(' ');
      newTitle.pop();
      newTitle.push('...');
      newTitle = newTitle.join(' ');
      return newTitle;
    } return title;
  };

  return (
    <Col className={style.cardMovie} style={{ padding: 0 }}>
      <Card className={style.gridStyle} bodyStyle={{ padding: '0', width: '100%' }}>
        <Row className={style.row}>
          <Poster src={poster_path} />
          <Col className={style.wrapperLayoutCard}>
            <Layout className={style.layoutStyle}>
              <Header className={style.headerStyle}>
                <h5 className={style.titleStyle} title={title}>
                  {showTitle(title)}
                </h5>
                <CircleRating voted={vote_average} />
              </Header>
              <Content className={style.contentStyle}>
                <p className={style.releaseStyle}>{String(release)}</p>
                <GenresList genresOfMovie={genre_ids} className={style.genres} />
                <main className={style.mainContent}>
                  <p className={style.description}>{text}</p>
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
