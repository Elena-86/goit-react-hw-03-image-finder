import { Component } from 'react';
import axios from 'axios';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

import { MainContainer } from './App.styled';

const PIXABAY_API_KEY = '22753762-fd63e7dfb5c4c0a273cbd20a6';

export default class App extends Component {
  state = {
    query: '',
    images: [],
    error: null,
    status: 'idle',
  };
  async componentDidMount() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${this.state.query}&page=1&key=${PIXABAY_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState({ images: response.data.hits });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    if (prevQuery !== nextQuery) {
      console.log('Изменился запрос!');

      this.setState({ loading: true });

      axios
        .get(
          `https://pixabay.com/api/?q=${nextQuery}&page=1&key=${PIXABAY_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(
              `Nothing was found according to your "${nextQuery}" query try enother key word!`
            )
          );
        })
        .then(images => this.setState({ images, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleFormSubmit = query => {
    this.setState(query);
  };

  render() {
    const { status, images, error } = this.state;

    if (status === 'pendig') {
      return <h2>Loading...</h2>;
    }
    if (status === 'rejected') {
      return <h2>{error.message}</h2>;
    }
    if (status === 'resolved') {
      return <ImageGallery images={images}></ImageGallery>;
    }
    return (
      <MainContainer>
        <Searchbar onSubmit={this.handleFormSubmit} />
      </MainContainer>
    );
  }
}
