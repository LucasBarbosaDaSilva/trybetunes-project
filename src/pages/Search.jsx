import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artistName: '',
  };

  saveArtistName = ({ target: { value } }) => {
    this.setState({ artistName: value });
  };

  render() {
    const { artistName } = this.state;
    const minimalCharacter = 2;

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
            onChange={ this.saveArtistName }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artistName.length < minimalCharacter }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
