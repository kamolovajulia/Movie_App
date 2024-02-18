import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Layout, Alert, Tabs } from 'antd';
import SearchContent from '../SearchContent/SearchContent';
import RatingList from '../RatingList/RatingList';

import style from './App.module.css';

import Loader from '../Loader/Loader';

export const Context = React.createContext(null);

export default class App extends Component {
  state = {
    elements: [],
    isLoaded: false,
    label: '',
    resourse: 'https://api.themoviedb.org/3/',
    url: null,
    isFetching: false,
    sessionID: null,
    ratingList: null,
    selectedKeys: 'search',
    genres: null,
  };

  componentDidMount() {
    this.getSession();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.label !== prevState.label) {
      this.setState({
        isFetching: true,
      });
      this.getMovies(1);
      this.setState({
        isFetching: false,
      });
    }
  }

  requestOptions = (method = 'GET', body) => ({
    method,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjJjMTYxYTcwNGI1NGZhNjkzMjYyNjcwM2FhZGRjOSIsInN1YiI6IjY1NzhkZmE1YmJlMWRkMDBmZTJjNmU1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7Wt-Lk56IlrLIcyNKzU4CKg1vvDd3e08yecvC3QDlVY',
    },
    body,
  });

  debounce = (fn, debounceTime) => {
    let timeout;
    return function () {
      const fnCall = () => {
        fn.apply(this, arguments);
      };
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, debounceTime);
    };
  };

  searchName = (e) => {
    if (e.target.value.trim()) {
      this.setState(() => ({
        label: e.target.value.trim(),
        url: `${this.state.resourse}search/movie?query=${e.target.value.trim()}&include_adult=false&language=en-US&page=`,
      }));
    }
  };

  searchName = this.debounce(this.searchName, 600);

  getSession = () => {
    fetch(`${this.state.resourse}authentication/guest_session/new`, this.requestOptions())
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          this.setState({ isLoaded: true, sessionID: response.guest_session_id });
        }
      })
      .catch((error) => this.setState({
        isLoaded: true,
        error,
      }));

    fetch(`${this.state.resourse}genre/movie/list?language=en`, this.requestOptions())
      .then((response) => response.json())
      .then((response) => this.setState({ genres: response.genres }))
      .catch((error) => this.setState({ error }));
  };

  getMovies = (n) => {
    fetch(`${this.state.url}${n}`, {
      headers: {
        Accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjJjMTYxYTcwNGI1NGZhNjkzMjYyNjcwM2FhZGRjOSIsInN1YiI6IjY1NzhkZmE1YmJlMWRkMDBmZTJjNmU1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7Wt-Lk56IlrLIcyNKzU4CKg1vvDd3e08yecvC3QDlVY',
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((result) => {
        if (result.results.length == 0 && this.state.label) {
          this.setState(() => ({
            elements: [],
            message: true,
          }));
        } else {
          this.setState(() => ({
            elements: result.results,
            message: false,
          }));
        }
      })
      .then(() => this.setState({
        isFetching: false,
      }))
      .catch((error) => this.setState({
        error,
      }));
  };

  addRating = (id, n) => {
    fetch(
      `${this.state.resourse}movie/${id}/rating?guest_session_id=${this.state.sessionID}`,
      this.requestOptions('POST', `{"value":${n}}`)
    )
      .then((response) => response.json())
      .catch((error) => this.setState({ error }));

    setTimeout(() => {
      this.getRatingList();
    }, 4000);
  };

  getRatingList = () => {
    fetch(
      `${this.state.resourse}guest_session/${this.state.sessionID}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
      this.requestOptions()
    )
      .then((response) => response.json())
      .then((response) => this.setState({ ratingList: response.results }));
  };

  changeTabPane(e) {
    this.setState({ selectedKeys: e });
  }

  render() {
    const { error, isLoaded, genres } = this.state;

    if (error) {
      return (
        <div className={style.example}>
          <Alert
            message={`Error ${error.status}`}
            description={`Sorry, could not find ${error.url}`}
            type="error"
            style={{ textAlign: 'left' }}
            showIcon
          />
        </div>
      );
    } if (!isLoaded) {
      return <Loader />;
    }

    const items = [
      {
        label: 'Search',
        key: 'search',
        children: (
          <SearchContent
            state={this.state}
            searchName={this.searchName}
            addRating={this.addRating}
            getRatingList={this.getRatingList}
            getMovies={this.getMovies}
          />
        ),
      },
      {
        label: 'Rated',
        key: 'rated',
        destroyInactiveTabPane: 'true',
        children: <RatingList state={this.state.ratingList} />,
      },
    ];

    return (
      <div>
        <Online>
          <Context.Provider value={genres}>
            <div className={style.app}>
              <Layout className={style.wrapStyle}>
                <Tabs
                  activeKey={this.state.selectedKeys}
                  items={items}
                  centered
                  onChange={(e) => this.changeTabPane(e)}
                  className={style.menu}
                />
              </Layout>
            </div>
          </Context.Provider>
        </Online>
        <Offline>
          <div className={style.messageError}>
            <Alert
              message="Error"
              description="Sorry, connection lost :("
              type="error"
              style={{ textAlign: 'left' }}
              showIcon
            />
          </div>
        </Offline>
      </div>
    );
  }
}
