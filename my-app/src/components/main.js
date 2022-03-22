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
    let test = [];
    const j = query(collection(db, "Job"))
    const unsub = onSnapshot(j, (querySnapshot) => {
        const response = querySnapshot.docs.map(doc => doc.data());
        response.forEach(element => {
            joblist.push(element.JobName);
            jobinfo.push(element.Information);
            test.push(element);
        });
    });
    //console.log(jobinfo);
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
    const[Information, setInformation] = useState("");
    const [Deadline, setDeadline] = useState("");
    const CreateS = () => {
        if (!SystemName || !SystemLead) 
        {
            alert("Please enter all the fields");
        }
        else
        {
            createSystem(SystemName, SystemLead);
        }
    }
    const CreateJ = () => {
        if (!Deadline || !SystemJobName || !Information) 
        {
            alert("Please enter all the fields");
        }
        else
        {
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
        //console.log(admin, name, email, info);
        var Welcome = "Welcome " + email;
    }
    else { //if not logged in
        var Welcome = "Welcome Guest";
        var email = "";
        var name = "";
        var info = "";
    }
    var i = 0;
      console.log(test);
    const currentOptionText1 = document.getElementById("current-option-text1");
    const currentOptionInformation = document.getElementById("current-option-information");
    const testingtext = document.getElementById("testing");
    
    const carousel = document.getElementById("carousel-wrapper");
    const NextOption = () => {
        i = i + 1;
        i = i % test.length;
        //testingtext.dataset.nextText = test[i].JobName;
        currentOptionText1.dataset.nextText = joblist[i];
        currentOptionInformation.dataset.nextText = jobinfo[i];
        carousel.classList.add("anim-next");
        setTimeout(() => {
            //testingtext.dataset.nextText = test[i].JobName;
          currentOptionText1.innerText = joblist[i];
        currentOptionInformation.innerText = jobinfo[i];
          carousel.classList.remove("anim-next");
        }, 650);
      };
      const PreviousOption = () => {
        if (i === 0) {
          i = joblist.length;
        }
        i = i - 1;
        //testingtext.dataset.nextText = test[i].JobName;
        currentOptionText1.dataset.previousText = joblist[i];
        currentOptionInformation.dataset.previousText = jobinfo[i];

        carousel.classList.add("anim-previous");
        setTimeout(() => {
           // testingtext.dataset.nextText = test[i].JobName;
          currentOptionText1.innerText = joblist[i];
        currentOptionInformation.innerText = jobinfo[i];
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
                            <span id="current-option-text1" data-previous-text="" data-next-text=""></span>
                            <span id="current-option-information" data-previous-text="" data-next-text=""></span>
                        </div>
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
                        className="createTask_textBox"
                        value={SystemName}
                        onChange={(e) => setSystemName(e.target.value)}
                        placeholder="Enter System Name"
                    />
                    <input
                        type="text"
                        className="createTask_textBox"
                        value={SystemLead}
                        onChange={(e) => setSystemLead(e.target.value)}
                        placeholder="Enter System Lead Name"
                    />
                </div>
                <div className="Jobs">
                    <Button variant="outlined" name="addTaskBtn" onClick={CreateJ}>Create Job</Button>
                    <select id = "selectSystems" onChange={(e) => setSystemSelection(e.target.value)}>  
                        <option> ---Choose System--- </option>
                    </select>
                    
                    <input
                        type="text"
                        className="createTask_textBox"
                        value={SystemJobName}
                        onChange={(e) => setSystemJobName(e.target.value)}
                        placeholder="Enter Job Name"
                    />
                    <input
                        type="text"
                        className="createTask_textBox"
                        value={Information}
                        onChange={(e) => setInformation(e.target.value)}
                        placeholder="Enter Job Information"
                    />
                    <input
                        type="text"
                        className="createTask_textBox"
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