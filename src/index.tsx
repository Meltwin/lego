import React from 'react';
import ReactDOM from 'react-dom/client';
import { LegoBrick } from './bricks/LegoBrick';
import "./index.css"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LegoBrick />
    <LegoBrick color={{ red: 0, blue: 1, green: 0.3, alpha: 1 }} width={2} length={3} height={0.4} />
  </React.StrictMode>
);
