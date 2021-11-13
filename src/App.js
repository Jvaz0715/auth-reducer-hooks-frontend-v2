import { BrowserRouter as Router } from 'react-router-dom';

import MainRouter from './MainRouter';
import Spinner from './Spinner/Spinner';

import './App.css';
import React from 'react';

function App() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Router>
        <MainRouter />
      </Router>
    </React.Suspense>
  );
}

export default App;
