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
    
    var i = 0;
    const currentOption = document.getElementById("currentitem");
    const nextOption = document.getElementById("nextitem");
    const previousOption = document.getElementById("previousitem");
    const NextOption = () => {
        i = i + 1;
        i = i % systemnames.length;
        currentOption.dataset.nextText = systemnames[i];
        carousel.classList.add("anim-next");
        setTimeout(() => {
            currentOption.innerText = systemnames[i];
            carousel.classList.remove("anim-next");
        }, 650);
    }
    const PreviousOption = () => {
        if (i === 0) {
            i = systemnames.length;
        }
        i = i - 1;
        currentOption.dataset.previousText = systemnames[i];
        carousel.classList.add("anim-previous");

        setTimeout(() => {
            currentOption.innerText = systemnames[i];
            carousel.classList.remove("anim-previous");
        }, 650);
    };
    return (
        <div class="items">
            <div class="item active">
                <span id="currentitem" data-previous-text="" data-next-text=""></span>
            </div>
            <div class=" item next">
                <span id="nextitem" data-previous-text="" data-next-text=""></span>
            </div>
            <div class="item prev">
                <span id="previousitem" data-previous-text="" data-next-text=""></span>
            </div>
            <div class="button-container">
                <div class="button" onClick={NextOption}></div>
                <div class="button"onClick={PreviousOption} ></div>
            </div>
	    </div>
    )
}
export default Explore;