import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import './Album.css';

export default class Album extends Component {
  state = {
    songs: undefined,
    album: undefined,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const songList = await getMusics(id);
    this.setState({
      songs: songList.slice(1, songList.length),
      album: songList[0],
    });
  }

  render() {
    const { album, songs } = this.state;

    return (
      <div data-testid="page-album" className="page-album">
        <Header />
        {album ? (
          <div className="album-page">
            <img src="https://cdn-icons-png.flaticon.com/512/1544/1544829.png" alt="logo" className="logo-search" />
            <img src={ album.artworkUrl100 } alt="Artista" className="image-album-page" />
            <div className="album-artist-name">
              <h2 data-testid="album-name">
                {album.collectionName}
              </h2>
              <h3 data-testid="artist-name">
                {album.artistName}
              </h3>
            </div>
            <div className="music-album">
              {songs.map((song) => (

                <MusicCard
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  key={ song.trackName }
                  trackId={ song.trackId }
                  track={ song }
                />
              ))}
            </div>
          </div>
        ) : (
          <Loading />
        )}
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
