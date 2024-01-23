import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import { HashRouter, Route, Routes } from 'react-router-dom';
import { RandomizedPage } from './randomized/RandomizedPage';
import { ButtonPage } from './button/ButtonPage';
import { Poster } from './poster/Poster';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="*" element={<ButtonPage />} />
        <Route path="random" element={<RandomizedPage />} />
        <Route path="poster" element={<Poster />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
