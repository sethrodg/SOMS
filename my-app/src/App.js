import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './navbar/navbar';
import Login from './components/loginpage';
import SignUp from './components/signup';
import Main from './components/main';
import Explore from './components/explore';
import Developers from './components/developers';
import Announce from './components/announce';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes >
        <Route exact path="/login" element={< Login />} />
        <Route exact path="/" element={< Main />} />
        <Route exact path="/signup" element={< SignUp />} />
        <Route exact path="/explore" element={< Explore />} />
        <Route exact path="/developers" element={< Developers />} />
        <Route exact path="/announce" element={< Announce />} />
      </Routes>
    </Router>
  );
}

export default App;