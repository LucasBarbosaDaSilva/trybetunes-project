import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './MusicCard.css';

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
      <div className="music-card">
        { loading ? <Loading /> : (
          <div className="component-card">
            <div>

              <h3 className="track-name">{trackName}</h3>
            </div>
            <div>
              <audio
                className="audio"
                data-testid="audio-component"
                src={ previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>
            <div className="input-component">
              <label htmlFor="check-input">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="heart" viewBox="0 0 16 16">
                  {' '}
                  <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878
                    1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92
                    1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542
                     6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878
                     10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04
                      7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1
                      .176-.17C12.72-3.042 23.333 4.867 8 15z"
                  />
                  {' '}
                </svg>
              </label>
              <input
                className="favorite"
                id="check-input"
                type="checkbox"
                onChange={ this.handleClick }
                checked={ checkbox }
                data-testid={ `checkbox-music-${trackId}` }
              />
            </div>
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
