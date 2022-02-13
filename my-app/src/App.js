import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/loginpage';
import MainPage from './components/mainpage';

//Firebase
import { initializeApp } from 'firebase/app';
//import { getDatabase } from "firebase/database";
import { getDatabase, ref, set } from "firebase/database";

function App() {
    return ( <
        Router >
        <
        Routes >
        <
        Route exact path = "/login"
        element = { < Login / > }
        /> <
        Route exact path = "/home"
        element = { < MainPage / > }
        /> < /
        Routes > <
        /Router>
    );
}


//Configure Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDdSTvLk9KzL3GkBSFOoTX7DS9PaqqIqaU",
    authDomain: "soms-409ff.firebaseapp.com",
    databaseURL: "https://soms-409ff-default-rtdb.firebaseio.com",
};
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);

function writeUserData(userId, name, email) {
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email
    });
}
writeUserData("sar2402", "Seth", "sethallenrodgers@gmail.com")


export default App;