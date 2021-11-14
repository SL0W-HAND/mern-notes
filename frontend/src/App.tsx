import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Routes,Route ,} from 'react-router-dom';

//libraries
import { library } from '@fortawesome/fontawesome-svg-core';
import './styles/modules.scss';

//pages
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/" element={<Home />}
        />
        <Route
        path="/login" element={<Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
