import React from 'react';
import { Timeline } from './timeline';

const rovers = [
    {
        id: 1,
        name: 'Spirit'
    },
    {
        id: 2,
        name: 'Curiosity'
    }
];

export default function App() {
    return(
        <Timeline rovers={rovers} />
    );
}