import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from '../firebase';
import './style.css';
import Data from './data';
import Carousel from "react-elastic-carousel";
import './main.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    auth,
    createSystem,
    createJob,
} from '../firebase';
import { color, style } from '@mui/system';
import { contains } from '@firebase/util';
import { Dropdown } from 'react-bootstrap';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
const breakPoints = [
    { width: 1, itemsToShow: 1, pagination: false },
    { width: 0, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 0, itemsToShow: 3, pagination: false },
    { width: 0, itemsToShow: 5, pagination: false }
];
function Pop() {
    let select = document.getElementById("selectSystems"); //Will appear twice in the dropdown
    let joblist = [];
    let jobinfo = [];
    let jobsystem = [];
    const j = query(collection(db, "Job"))
    const unsub = onSnapshot(j, (querySnapshot) => {
        const response = querySnapshot.docs.map(doc => doc.data());
        response.forEach(element => {
            joblist.push(element.JobName);
            jobinfo.push(element.Information);
            jobsystem.push(element.SystemName);
        });
    });
    const s = query(collection(db, "Systems"))
    const unsubb = onSnapshot(s, (querySnapshot) => {
        const response = querySnapshot.docs.map(doc => doc.data());
        response.forEach(element => {
            var opt = element.name;
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        });
    });
    const [user] = useAuthState(auth);
    const [SystemName, setSystemName] = useState("");
    const [SystemLead, setSystemLead] = useState("");

    const [SystemSelection, setSystemSelection] = useState("");
    const [SystemJobName, setSystemJobName] = useState("");
    const [Information, setInformation] = useState("");
    const [Deadline, setDeadline] = useState("");
    const CreateS = () => {
        if (!SystemName || !SystemLead) {
            alert("Please enter all the fields");
        }
        else {
            createSystem(SystemName, SystemLead);
        }
    }
    const CreateJ = () => {
        if (!Deadline || !SystemJobName || !Information) {
            alert("Please enter all the fields");
        }
        else {
            createJob(SystemSelection, SystemJobName, Information, Deadline);
        }
    };
    if (user) { //check if user is logged in
        var email = user.email;
        var name = user.name;
        var info = user;
        var admin = false;
        if (email.slice(-8).includes("@uta.edu")) {
            //checks to see if the last characters have the correct email for admin privledges
            admin = true;
            
        }
        console.log(admin)
        var Welcome = "Welcome " + email;
    }
    else { //if not logged in
        var Welcome = "Welcome Guest";
        var email = "";
        var name = "";
        var info = "";
    }
    const color_options = ["#EBB9D2", "#FE9968", "#7FE0EB", "#6CE5B1"];
    const image_options = [
        "https://images.unsplash.com/photo-1524721696987-b9527df9e512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1190&q=80",
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1506073828772-2f85239b6d2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80",
        "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
    ];
    var i = 0;
    const currentOptionText1 = document.getElementById("current-option-text1");
    const currentOptionInformation = document.getElementById("current-option-information");
    const currentOptionSystemName = document.getElementById("current-option-systemname");
    const mainMenu = document.getElementById("menu");
    const currentOptionImage = document.getElementById("image");

    const carousel = document.getElementById("carousel-wrapper");
    const NextOption = () => {
        i = i + 1;
        i = i % joblist.length;
        currentOptionText1.dataset.nextText = joblist[i];
        currentOptionInformation.dataset.nextText = jobinfo[i];
        currentOptionSystemName.dataset.nextText = jobsystem[i];
        carousel.classList.add("anim-next");

        setTimeout(() => {
            currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
        }, 455);

        setTimeout(() => {
            currentOptionText1.innerText = joblist[i];
            currentOptionInformation.innerText = jobinfo[i];
            currentOptionSystemName.innerText = jobsystem[i];
            mainMenu.style.background = color_options[i];
            carousel.classList.remove("anim-next");
        }, 650);
    };
    const PreviousOption = () => {
        if (i === 0) {
            i = joblist.length;
        }
        i = i - 1;
        currentOptionText1.dataset.previousText = joblist[i];
        currentOptionInformation.dataset.previousText = jobinfo[i];
        currentOptionSystemName.dataset.previousText = jobsystem[i];
        carousel.classList.add("anim-previous");

        setTimeout(() => {
            currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
        }, 455);

        setTimeout(() => {
            currentOptionText1.innerText = joblist[i];
            currentOptionInformation.innerText = jobinfo[i];
            currentOptionSystemName.innerText = jobsystem[i];
            mainMenu.style.background = color_options[i];
            carousel.classList.remove("anim-previous");
        }, 650);
    };
    return (
        <>
            <div className="filloutpage">
                <div>
                    <h3 className="pop_nf_h3">{Welcome}</h3>
                </div>
                <div className="pop_main">
                    <div id="carousel-wrapper">
                        <div id="menu">
                            <div id="current-option">
                                <span id="current-option-systemname" data-previous-text="" data-next-text=""></span>
                                <span id="current-option-text1" data-previous-text="" data-next-text=""></span>
                                <span id="current-option-information" data-previous-text="" data-next-text=""></span>
                            </div>
                            <div id="image"></div>
                            <button id="previous-option" onClick={PreviousOption}></button>
                            <button id="next-option" onClick={NextOption}></button>
                            <Button variant="outlined" name="EnrollBtn" >Enroll</Button>
                        </div>
                    </div>
                </div>
                <div className="Tasking">
                    <Button variant="outlined" name="addTaskBtn" onClick={CreateS}>Create System</Button>
                    <input
                        type="text"
                        className="SystemName"
                        value={SystemName}
                        onChange={(e) => setSystemName(e.target.value)}
                        placeholder="Enter System Name"
                    />
                    <input
                        type="text"
                        className="SystemLeadName"
                        value={SystemLead}
                        onChange={(e) => setSystemLead(e.target.value)}
                        placeholder="Enter System Lead Name"
                    />
                </div>
                <div className="Jobs">
                    <Button variant="outlined" name="addTaskBtn" onClick={CreateJ}>Create Job</Button>
                    <select id="selectSystems" onChange={(e) => setSystemSelection(e.target.value)}>
                        <option> ---Choose System--- </option>
                    </select>

                    <input
                        type="text"
                        className="setSystemJobName"
                        value={SystemJobName}
                        onChange={(e) => setSystemJobName(e.target.value)}
                        placeholder="Enter Job Name"
                    />
                    <input
                        type="text"
                        className="setJobInfo"
                        value={Information}
                        onChange={(e) => setInformation(e.target.value)}
                        placeholder="Enter Job Information"
                    />
                    <input
                        type="text"
                        className="setJobDueDate"
                        value={Deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        placeholder="Enter Due Date"
                    />
                </div>
            </div>
        </>
    );
}
export default Pop;