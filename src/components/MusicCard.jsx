import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    // loading: true,
  };

  render() {
    // const { loading } = this.state;
    const { trackName, previewUrl } = this.props;

    return (
      <div>
        {/* { loading ? <Loading />
          : ( */}
        <div>
          <h3>
            {trackName}
          </h3>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>
              audio
            </code>
            .
          </audio>
        </div>
        {/* ) } */}
      </div>
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};
