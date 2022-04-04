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
    
        return arr.filter(function(ele){ 
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
        
        let list = document.getElementById("carouselList");
        systemnames.forEach(item => {
        console.log(item);
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
        });
        console.log(list);
    });



    document.addEventListener('DOMContentLoaded', function() {
        var stream = document.querySelector('.gallery__stream');
        var items = document.querySelectorAll('.gallery__item');
        
        var prev = document.querySelector('.gallery__prev');
        prev.addEventListener('click', function() {
          stream.insertBefore(items[items.length - 1], items[0]);
          items = document.querySelectorAll('.gallery__item');
        });
        
        var next = document.querySelector('.gallery__next');
        next.addEventListener('click', function() {
          stream.appendChild(items[0]);
          items = document.querySelectorAll('.gallery__item');
        });
      });
    //Can't add list elements since line 57 doesn't work
    
    return (
        <div className = "testing">
            <div class="gallery">
                <div class="gallery__prev"></div>
                <div class="gallery__next"></div>
                <div class ="gallery__stream">
                    <div class = "gallery__item" id = "carouselList"/>
                    <div class="gallery__item bg-1">ONE</div>
                    <div class="gallery__item bg-2">TWO</div>
                    <div class="gallery__item bg-3">THREE</div>
                    <div class="gallery__item bg-4">FOUR</div>
                    <div class="gallery__item bg-5">FIVE</div>
                    <div class="gallery__item bg-6">SIX</div>
                    <div class="gallery__item bg-7">SEVEN</div>
                </div>
            </div>
        </div>
    )
}
export default Explore;