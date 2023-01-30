import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    checkbox: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const favoriteList = await getFavoriteSongs();
    const result = favoriteList.some((e) => e.trackId === trackId);
    this.setState({
      loading: false,
      checkbox: result,
    });
  }

  handleClick = async (event) => {
    const { track } = this.props;
    this.setState({ loading: true });
    if (event.target.checked) {
      await addSong(track);
      this.setState({
        loading: false,
        checkbox: true,
      });
    } else {
      await removeSong(track);
      this.setState({
        loading: false,
        checkbox: false,
      });
    }
  };

  render() {
    const { loading, checkbox } = this.state;
    const { trackName, previewUrl, trackId } = this.props;

    return (
      <div>
        { loading ? <Loading /> : (
          <div>
            <h3>{trackName}</h3>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor="check-input">
              <input
                name="check-input"
                type="checkbox"
                onChange={ this.handleClick }
                checked={ checkbox }
                data-testid={ `checkbox-music-${trackId}` }
              />
              Favorita
            </label>
          </div>
        )}
      </div>
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  track: PropTypes.shape([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
