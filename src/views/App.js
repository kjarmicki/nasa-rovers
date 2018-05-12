import React, { PureComponent } from 'react';
import fetch from 'node-fetch';
import { Timeline } from './timeline';
import roversRepositoryCreator from '../repositories/rovers';
import nasaApiClientCreator from '../clients/nasa-api';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rovers: [],
    };
    this.roversRepository = roversRepositoryCreator(nasaApiClientCreator(fetch));
  }

  async componentDidMount() {
    const rovers = await this.roversRepository.getAll();
    this.setState({
      rovers,
    });
  }

  render() {
    return (
        <Timeline rovers={this.state.rovers} />
    );
  }
}
