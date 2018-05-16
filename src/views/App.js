import React from 'react';
import 'normalize.css';
import { Timeline } from './timeline';
import { Galleries } from './gallery';
import './App.css';

export default function App() {
  return (
    <div className="app-shell">
      <Timeline />
      <Galleries />
    </div>
  );
}
