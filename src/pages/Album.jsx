import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

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
      <div data-testid="page-album">
        <Header />
        {album ? (
          <div>
            <img src={ album.artworkUrl100 } alt="Artista" />

            <h2 data-testid="album-name">
              {album.collectionName}
            </h2>
            <h3 data-testid="artist-name">
              {album.artistName}
            </h3>
            {songs.map((e) => (
              <MusicCard
                trackName={ e.trackName }
                previewUrl={ e.previewUrl }
                key={ e.trackName }

              />
            ))}
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
