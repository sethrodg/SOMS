import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from '../firebase';
import "./explore.css"
const Explore = () => {
    let systemnames = [];
    let systemlead = [];
    let systemdesc = [];
    const s = query(collection(db, "Systems"))
    const unsubb = onSnapshot(s, (querySnapshot) => {
        const response = querySnapshot.docs.map(doc => doc.data());
        response.forEach(element => {
            systemnames.push(element.name);
            systemlead.push(element.SystemLead);
        });
    });
    console.log(systemnames);
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
    // Can't add list elements since line 57 doesn't work
    //   function makeUL(array) {
    //     // Create the list element:
    //     var list = document.createElement('ul');
    
    //     for(var i = 0; i < array.length; i++) {
    //         // Create the list item:
    //         var item = document.createElement('li');
    
    //         // Set its contents:
    //         item.appendChild(document.createTextNode(array[i]));
    
    //         // Add it to the list:
    //         list.appendChild(item);
    //     }
    
    //     // Finally, return the constructed list:
    //     return list;
    // }
    
    // Add the contents of options[0] to #foo:
    //document.getElementById('carouselList').appendChild(makeUL(systemnames));
    return (
        <div className = "testing">
            <div id="carouselList"/>
            <div class="gallery">
            <div class="gallery__prev"></div>
            <div class="gallery__next"></div>
                <div class="gallery__stream">
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