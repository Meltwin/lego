import React from 'react';
import ReactDOM from 'react-dom/client';
import { LegoBrick } from './bricks/LegoBrick';
import "./index.css"
import { HashRouter, Route, Routes } from 'react-router-dom';
import { RandomizedPage } from './randomized/RandomizedPage';
import { ButtonPage } from './button/ButtonPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="*" element={<ButtonPage />} />
        <Route path="random" element={<RandomizedPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
