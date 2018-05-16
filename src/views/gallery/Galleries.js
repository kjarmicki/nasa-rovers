import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import Gallery from './Gallery';

export class Galleries extends Component {
  render() {
    return (
      <div className="galleries">
        {Object.keys(this.props.roverPhotos).map(roverName =>
          <Gallery key={`${roverName}-photos`} roverName={roverName} photos={this.props.roverPhotos[roverName]} />)}
      </div>
    );
  }
}

Galleries.propTypes = {
  roverPhotos: object,
};

export default connect(state => ({
  roverPhotos: state.roverPhotos,
}))(Galleries);
