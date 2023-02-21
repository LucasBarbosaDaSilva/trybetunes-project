import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import './Search.css';

export default class Search extends Component {
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
      <div data-testid="page-search" className="page-search">
        <Header />
        { loading ? <Loading />
          : (
            <div data-testid="page-login">
              <img src="https://cdn-icons-png.flaticon.com/512/1544/1544829.png" alt="logo" className="logo-search" />
              <div className="input-button">
                <input
                  className="input-artist"
                  type="search"
                  name="search-artist"
                  id="search-artist"
                  data-testid="search-artist-input"
                  placeholder="Digite o nome do artista"
                  onChange={ this.saveArtistName }
                />

                <button
                  className="search-button"
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ artistName.length < minimalCharacter }
                  onClick={ this.returnApiResult }
                >
                  Pesquisar
                </button>
              </div>
              <div className="result-search">
                <h3 className="title-search">
                  {
                    artistName && apiResult
                      ? `Resultado de álbuns de: ${artistName}` : null
                  }
                </h3>
                <div className="result">
                  { !apiResult
                  && <h3 className="title-search">Nenhum álbum foi encontrado</h3>}
                  {artistResult.map((e, index) => (
                    <div key={ index } className="artist-result">
                      <Link
                        to={ `/album/${e.collectionId}` }
                        data-testid={ `link-to-album-${e.collectionId}` }
                        key={ e.collectionId }
                      >
                        <img src={ e.artworkUrl100 } alt="foto" className="image-album" />
                        <h4>
                          { e.collectionName }
                        </h4>
                        <p>
                          { e.artistName }
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}
