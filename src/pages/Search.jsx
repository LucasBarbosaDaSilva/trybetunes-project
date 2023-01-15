import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <div data-testid="page-login">
          <input
            type="search"
            name="search-artist"
            id="search-artist"
            data-testid="search-artist-input"
            placeholder="Digite o nome do artista"
          />
          <button
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
