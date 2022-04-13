import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from '../firebase';
import "./explore.css"
const Explore = () => {
    let systemnames = [];
    let select = document.getElementsByClassName("gallery__item"); //Will appear twice in the dropdown
    let systemlead = [];
    let systemdesc = [];
    function arrayRemove(arr, value) {

        return arr.filter(function (ele) {
            return ele != value;
        });
    }
    const s = query(collection(db, "Systems"))
    const unsubb = onSnapshot(s, (querySnapshot) => {
        const response = querySnapshot.docs.map(doc => doc.data());
        response.forEach(element => {
            var opt = element.name;
            systemnames.push(opt);
        }); 
        systemnames.forEach(item => {
            let parentnode = document.getElementById("div1"); //make the parentnode
            let child = document.createElement("div"); //make the child
            child.classList = "gallery__item"; //give the child the class (gallery__item) is what's used in CSS to make it all work across the board
            let li = document.createTextNode(item); //giving the child some content
            child.appendChild(li);
            parentnode.appendChild(child);
        });
    });



    document.addEventListener('DOMContentLoaded', function () {
        var stream = document.querySelector('.gallery__stream');
        var items = document.querySelectorAll('.gallery__item');

        var prev = document.querySelector('.gallery__prev');
        prev.addEventListener('click', function () {
            stream.insertBefore(items[items.length - 1], items[0]);
            items = document.querySelectorAll('.gallery__item');
        });

        var next = document.querySelector('.gallery__next');
        next.addEventListener('click', function () {
            stream.appendChild(items[0]);
            items = document.querySelectorAll('.gallery__item');
        });
    });

    return (
        <div className="testing">
            <div class="gallery">
                <div class="gallery__prev"></div>
                <div class="gallery__next"></div>
                <div class="gallery__stream" id = "div1">
                    <div class = "gallery__item">Welcome to the Explore Page</div>
                </div>
            </div>
        </div>
    )
}
export default Explore;