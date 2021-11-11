import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';

function App() {
  return (
    <Router>
      <Routes />
      <ToastContainer />
    </Router>
  )
}

export default App;