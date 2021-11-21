import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Cookies from 'universal-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';

import { Login } from './screens/LoginPage';

function App() {
  const cookies = new Cookies();

  const loggedIn = () => {
    const cookie = cookies.get("token");
    return cookie && cookie !== "";
  }

  return (
    <Router>
      {
        !loggedIn && <Route path="/" element={<Login />} />
      }
      <Routes />
      <ToastContainer />
    </Router>
  )
}

export default App;