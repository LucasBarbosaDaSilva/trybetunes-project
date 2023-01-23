import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends Component {
  state = {
    songs: undefined,
    album: undefined,
    favoriteSong: undefined,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const songList = await getMusics(id);
    let favoriteSong = await getFavoriteSongs();
    favoriteSong = favoriteSong.map((e) => e.trackId);
    this.setState({
      songs: songList.slice(1, songList.length),
      favoriteSong,
      album: songList[0],
    });
  }

  render() {
    const { songs, album, favoriteSong } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div>
          {
            album ? <img src={ album.artworkUrl100 } alt="Artista" /> : null
          }
          <h2
            data-testid="artist-name"
          >
            { album ? album.artistName : <Loading /> }
          </h2>
          <h2
            data-testid="album-name"
          >
            { album ? album.collectionName : '' }
          </h2>
          <div>
            {
              songs ? songs.map((e) => (
                <MusicCard
                  song={ e }
                  key={ e.trackId }
                  favorite={ favoriteSong.includes(e.trackId) }
                  onTap={ () => {} }
                />
              ))
                : null
            }
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
