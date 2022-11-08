import { Component } from 'react';
import axios from 'axios';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

import { MainContainer } from './App.styled';

const PIXABAY_API_KEY = '22753762-fd63e7dfb5c4c0a273cbd20a6';

export default class App extends Component {
  state = {
    query: '',
    images: null,
    loading: false,
    error: null,
  };
  async componentDidMount() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${this.state.query}page=1&key=${PIXABAY_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
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

      fetch(
        `https://pixabay.com/api/?q=${nextQuery}&page=1&key=${PIXABAY_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(responce => responce.json())
        .then(images => this.setState({ images }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = query => {
    this.setState(query);
  };

  render() {
    const { loading, images } = this.state;
    return (
      <MainContainer>
        {this.error && (
          <h2>
            Nothind was found according to your {this.query} try enother key
            word!
          </h2>
        )}
        {loading && <h1>Loading...</h1>}
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images && <ImageGallery images={images}></ImageGallery>}
      </MainContainer>
    );
  }
}
