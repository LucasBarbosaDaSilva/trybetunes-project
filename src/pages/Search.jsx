import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    artistName: '',
    artistResult: [],
    apiResult: true,
    loading: false,
  };

  saveArtistName = ({ target: { value } }) => {
    this.setState({ artistName: value });
  };

  returnApiResult = async () => {
    const { artistName } = this.state;
    this.setState({ loading: true });
    const returnApi = await searchAlbumsAPI(artistName);
    if (returnApi.length <= 0) {
      this.setState({ apiResult: false });
      this.setState({ loading: false });
    } else {
      this.setState({ artistResult: returnApi });
      this.setState({ loading: false });
      this.setState({ apiResult: true });
    }
  };

  render() {
    const { artistName, artistResult, apiResult, loading } = this.state;
    const minimalCharacter = 2;

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading />
          : (
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
                onClick={ this.returnApiResult }
              >
                Pesquisar
              </button>
              <h3>
                Reultado de álbuns de:
                { ' ' }
                { artistName }
              </h3>
              { !apiResult && <h3>Nenhum álbum foi encontrado</h3> }
              {artistResult.map((e) => (
                <Link
                  to={ `/album/${e.collectionId}` }
                  data-testid={ `link-to-album-${e.collectionId}` }
                  key={ e.collectionId }
                >
                  <img src={ e.artworkUrl100 } alt="foto" />
                  <h4>
                    { e.collectionName }
                  </h4>
                  <p>
                    { e.artistName }
                  </p>
                  <p>
                    { e.collectionPrice }
                  </p>
                </Link>
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default Search;
