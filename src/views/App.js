import React from 'react';
import { shape, object, boolean } from 'prop-types';
import { connect } from 'react-redux';
import 'normalize.css';
import Message from './Message';
import { Timeline } from './timeline';
import { Galleries } from './gallery';
import './App.css';

export function App(props) {
  if (!props.stability.isStable) {
    return (
      <div className="app-shell">
        <Message error={props.stability.error} />
      </div>
    );
  }
  return (
    <div className="app-shell">
      <Timeline />
      <Galleries />
    </div>
  );
}

App.propTypes = {
  stability: shape({
    isStable: boolean,
    error: object,
  }),
};

App.defaultProps = {
  stability: {
    isStable: true,
  },
};

export default connect(state => ({
  stability: state.stability,
}))(App);
