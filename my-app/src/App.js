import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './navbar/navbar';
import Login from './components/loginpage';
import MainPage from './components/mainpage';
//import SignUp from './components/signup';

const App = () => {
  return (
    <Router>
      <Navbar />
        <Routes >
          <Route exact path="/login" element={< Login />} />
          <Route exact path="/home" element={< MainPage />} />
          {/* <Route exact path="/signup" element={< SignUp />} /> */}
        </Routes>
    </Router>
  );
}

export default App;