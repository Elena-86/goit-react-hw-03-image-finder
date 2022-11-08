// import PropTypes from 'prop-types';
import { Component } from 'react';
import { TfiSearch } from 'react-icons/tfi';
// import { toast } from 'react-toastify';
import {
  SearchbarComponent,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const query = form.elements.query.value;
    if (query.toLowerCase().trim() === '') {
      alert('Please enter key word for image search!');
      return;
    }
    this.props.onSubmit({ query });
    form.reset();
  };

  render() {
    return (
      <SearchbarComponent>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" className="button">
            <TfiSearch />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            className="input"
            type="text"
            name="query"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarComponent>
    );
  }
}

export default Searchbar;
