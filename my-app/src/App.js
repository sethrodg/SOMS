import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './navbar/navbar';
import Login from './components/loginpage';
import MainPage from './components/mainpage';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes >
        <Route exact path="/login" element={< Login />} />
        <Route exact path="/home" element={< MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;