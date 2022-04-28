import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from '../firebase';
import "./announce.scss"
const Announce = () => {
  document.addEventListener("DOMContentLoaded", function(event) { 
  //var cards = Array.from(document.querySelectorAll(".card"));
  var holder = document.querySelector("#holder");
  var up = document.querySelector("#up");
  var down = document.querySelector("#down");
  let announcementType = [];
  let announcement = [];
  const a = query(collection(db, "Announcement"))
    const unsubbb = onSnapshot(a, (querySnapshot) => {
        const response = querySnapshot.docs.map(doc => doc.data());
        response.forEach(element => {
            announcementType.push(element.AnnouncementType);
            announcement.push(element.Announcement);
        });
        var counter = 0;
        announcementType.forEach(item =>{
          let parentnode = document.getElementById("holder");
          let child = document.createElement("div");
          child.classList = "card";
          let header = document.createTextNode(item);
          let bodytext = document.createTextNode(counter);
          child.append(header);
          child.append(bodytext);
          parentnode.append(child);
          counter+=1;
        });
    });
    // Set the visible range for the 
  // cards - Currently 2
  var cards = Array.from(document.querySelectorAll(".card"));
  var visibles = {
      start: 0,
      end: 1
  };
  var scrolled = false;
  var setVisibles = function (range) {
      for (var i = 0; i < cards.length; i++) {
          cards[i].classList.remove("fading", "f1", "f2", "f3", "bottom", "top");
      }
      var uppers, lowers;
      if (range.end !== cards.length) {
          lowers = cards.slice(range.end);
          for (var i = 0; i < lowers.length; i++) {
              lowers[i].classList.add("fading");
              lowers[i].classList.add("bottom");
              if (i < 2) {
                  lowers[i].classList.add("f".concat(i + 1));
              }
              else {
                  lowers[i].classList.add("f3");
              }
          }
      }
      if (range.start !== 0) {
          uppers = cards.slice(0, range.start);
          for (var i = 0; i < uppers.length; i++) {
              uppers[i].classList.add("fading");
              uppers[i].classList.add("top");
              if (i < uppers.length - 2) {
                  uppers[i].classList.add("f3");
              }
              else {
                  uppers[i].classList.add("f".concat(uppers.length - i));
              }
          }
      }
  };
  var scrollAction = function (event) {
      if (!scrolled) {
          var scrolledDown = event.deltaY > 0;
          if (scrolledDown) {
              if (visibles.end < cards.length) {
                  visibles.start += 1;
                  visibles.end += 1;
                  // console.log("Down");
                  setVisibles(visibles);
              }
          }
          else {
              if (visibles.start > 0) {
                  visibles.start -= 1;
                  visibles.end -= 1;
                  // console.log("Up");
                  setVisibles(visibles);
              }
          }
          scrolled = true;
          setTimeout(function () {
              scrolled = false;
          }, 500);
      }
  };
  setVisibles(visibles);

  // document.addEventListener("DOMContentLoaded", function(event) { 
    // put your javascript code here
    console.log('document is ready. I can sleep now');
    holder?.addEventListener("mousewheel", scrollAction);
    holder?.addEventListener("DOMMouseScroll", scrollAction);
  });
  
      return (

    // <html>
         <body>
          <div id="holder">
            <div class="card" id ="first">
                <h1>Announcement 1</h1>
                <p>Hello user</p>
            </div>
            <div class="card" id = "second">
                <h1>Announcement 2</h1>
                <p>This is the content for card 2. This makes the body of the card</p>
            </div>
            {/* <div class="card">
                <h1>Announcement 3</h1>
                <p>This is the content for card 3. This makes the body of the card</p>
            </div>
            <div class="card">
                <h1>Announcement 4</h1>
                <p>This is the content for card 4. This makes the body of the card</p>
            </div>
            <div class="card">
                <h1>Announcement 5</h1>
                <p>This is the content for card 5. This makes the body of the card</p>
            </div>
            <div class="card">
                <h1>Announcement 6</h1>
                <p>This is the content for card 6. This makes the body of the card</p>
            </div> */}
        </div>
        <script src = "./testing.js"> </script>

        </body>
        
        


    )


}
export default Announce;