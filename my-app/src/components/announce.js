import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from '../firebase';
import "./announce.scss"
let announcementType = [];
let announcement = [];
const Announce = () => {
    const a = query(collection(db, "Announcement"))
    const unsubbb = onSnapshot(a, (querySnapshot) => {
        const response = querySnapshot.docs.map(doc => doc.data());
        response.forEach(element => {
            announcementType.push(element.AnnouncementType);
            announcement.push(element.Announcement);
        });
        var counter = 0;
        announcement.forEach(item => {
            let parentnode = document.getElementById("AnnoucementHeader");
            let child = document.createElement("li");
            let header = document.createTextNode(item);
            child.appendChild(header);
            parentnode.appendChild(child);
            counter += 1;
        });
    });
    let announcementcount = announcement.length;

    return (
        // <html>
        <div class="announcement-container">
            <div class="scrolling-words-container">
                <div class="scrolling-words-box">
                    <ul>
                        <li id="AnnoucementHeader">Announcements!</li>
                        <li id="AnnoucementHeader"></li>
                        <li id="AnnoucementHeader"></li>
                        <li id="AnnoucementHeader"></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Announce;