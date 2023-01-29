// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Loading from '../pages/Loading';

// export default class MusicCard extends Component {
//   render() {
//     return (
//       <div>MusicCard</div>
//     );
//   }
// }

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Loading from '../pages/Loading';
// import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

// class MusicCard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       favoriteSong: props.favoriteSong,
//       loading: false,
//     };
//   }

//   handleChange = async ({ target: { checked } }) => {
//     const { track } = this.props;
//     this.setState({
//       loading: true,
//     });
//     if (checked) {
//       await addSong(track);
//     } else {
//       await removeSong(track);
//     }
//     let favoriteSong = await getFavoriteSongs();
//     favoriteSong = favoriteSong.map((e) => e.trackId);
//     this.setState({
//       favoriteSong: favoriteSong.includes(track.trackId),
//     });
//     this.setState({
//       loading: false,
//     });
//   };

//   render() {
//     const { loading, favoriteSong } = this.state;
//     const { track: { trackId, trackName, previewUrl }, onTap } = this.props;

//     return (
//       <div>
//         <h3>{ trackName }</h3>
//         <label
//           htmlFor="checkbox-song"
//           data-testid={ `checkbox-music-${trackId}` }
//         >
//           Favorita
//           <input
//             type="checkbox"
//             id="checkbox-song"
//             checked={ favoriteSong }
//             onChange={ this.handleChange }
//             onClick={ onTap }
//           />
//           { loading ? <Loading /> : null }
//         </label>
//         <audio data-testid="audio-component" src={ previewUrl } controls>
//           <track kind="captions" />
//           O seu navegador não suporta o elemento
//           { ' ' }
//           <code>audio</code>
//           .
//         </audio>
//       </div>
//     );
//   }
// }

// MusicCard.propTypes = {
//   favoriteSong: PropTypes.bool.isRequired,
//   track: PropTypes.shape({
//     previewUrl: PropTypes.string.isRequired,
//     trackName: PropTypes.string.isRequired,
//     trackId: PropTypes.number.isRequired,
//   }).isRequired,
//   onTap: PropTypes.func.isRequired,
// };

// export default MusicCard;
