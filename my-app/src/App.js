import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/loginpage';
import MainPage from './components/mainpage';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/home" element={<MainPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
