import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './navbar/navbar';
import Login from './components/loginpage';
import SignUp from './components/signup';
import Main from './components/main.js';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes >
        <Route exact path="/login" element={< Login />} />
        <Route exact path="/" element={< Main />} />
        <Route exact path="/signup" element={< SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;