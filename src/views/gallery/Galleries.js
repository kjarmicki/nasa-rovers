import React, { Component } from 'react';
import Gallery from './Gallery';
import { connect } from 'react-redux';

export class Galleries extends Component {
  render() {
    return (
      <div className="galleries">
        {Object.keys(this.props.roverPhotos).map(roverName =>
          <Gallery key={`${roverName}-photos`} roverName={roverName} photos={this.props.roverPhotos[roverName]} />
        )}
      </div>
    );
  }
}

export default connect(state => ({
  roverPhotos: state.roverPhotos,
}))(Galleries);
