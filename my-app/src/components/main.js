import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from '../firebase';
import './style.css';
import './main.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    auth,
    createSystem,
    createJob,
    addPosition,
} from '../firebase';
function Pop() {
    let select = document.getElementById("selectSystems"); //Will appear twice in the dropdown
    let joblist = [];
    let jobinfo = [];
    let jobsystem = [];
    let jobdate = [];
    let currentJobName = "";
    let currentJobSystem = "";
    const j = query(collection(db, "Job"))
    const unsub = onSnapshot(j, (querySnapshot) => {
        const response = querySnapshot.docs.map(doc => doc.data());
        response.forEach(element => {
            joblist.push(element.JobName);
            jobinfo.push(element.Information);
            jobsystem.push(element.SystemName);
            jobdate.push(element.Deadline);
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
    //Our variables for the two different fields that we'll use later on to create sysmems and jobs
    const [user] = useAuthState(auth);
    const [SystemName, setSystemName] = useState("");
    const [SystemLead, setSystemLead] = useState("");

    const [SystemSelection, setSystemSelection] = useState("");
    const [SystemJobName, setSystemJobName] = useState("");
    const [Information, setInformation] = useState("");
    const [Deadline, setDeadline] = useState("");
    //creation of systems function
    const CreateS = () => {
        if (!SystemName || !SystemLead) {
            alert("Please enter all the fields");
        }
        else {
            createSystem(SystemName, SystemLead);
        }
    }
    //creation of jobs\tasks function
    const CreateJ = () => {
        if (!Deadline || !SystemJobName || !Information) {
            alert("Please enter all the fields");
        }
        else {
            createJob(SystemSelection, SystemJobName, Information, Deadline);
        }
    };
    //function to update the user's positions that they're enrolled in as well as the systems they're interested in
    const UpdateP = () => {
        if (!user) {
            alert("Please log in or select a job to enroll in");
        }
        console.log(user.userRef, currentJobName);
        console.log(currentJobSystem);
        addPosition(user.userRef, currentJobName, currentJobSystem);
    }
    if (user) { //check if user is logged in
        var email = user.email;
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
    }

    //This is all the code for the carosel
    const color_options = ["#EBB9D2", "#FE9968", "#7FE0EB", "#6CE5B1"];
    const image_options = [
        "https://images.unsplash.com/photo-1524721696987-b9527df9e512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1190&q=80",
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1506073828772-2f85239b6d2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80",
        "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
    ];
    var i = 0;
    const currentOptionJobName = document.getElementById("current-option-jobname");
    const currentOptionInformation = document.getElementById("current-option-information");
    const currentOptionSystemName = document.getElementById("current-option-systemname");
    const currentOptionDeadline = document.getElementById("current-option-deadline");
    const mainMenu = document.getElementById("menu");
    const currentOptionImage = document.getElementById("image");

    const carousel = document.getElementById("carousel-wrapper");
    const NextOption = () => {
        i = i + 1;
        i = i % joblist.length;
        currentOptionJobName.dataset.nextText = joblist[i];
        currentOptionInformation.dataset.nextText = jobinfo[i];
        currentOptionSystemName.dataset.nextText = jobsystem[i];
        currentOptionDeadline.dataset.nextText = jobdate[i];
        carousel.classList.add("anim-next");

        setTimeout(() => {
            currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
        }, 455);

        setTimeout(() => {
            currentOptionJobName.innerText = joblist[i];
            currentOptionInformation.innerText = jobinfo[i];
            currentOptionSystemName.innerText = jobsystem[i];
            currentOptionDeadline.innerText = jobdate[i];
            currentJobName = joblist[i];
            currentJobSystem = jobsystem[i];
            mainMenu.style.background = color_options[i];
            carousel.classList.remove("anim-next");
        }, 650);
    };
    const PreviousOption = () => {
        if (i === 0) {
            i = joblist.length;
        }
        i = i - 1;
        currentOptionJobName.dataset.previousText = joblist[i];
        currentOptionInformation.dataset.previousText = jobinfo[i];
        currentOptionSystemName.dataset.previousText = jobsystem[i];
        currentOptionDeadline.dataset.previousText = jobdate[i];
        carousel.classList.add("anim-previous");

        setTimeout(() => {
            currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
        }, 455);

        setTimeout(() => {
            currentOptionJobName.innerText = joblist[i];
            currentOptionInformation.innerText = jobinfo[i];
            currentOptionSystemName.innerText = jobsystem[i];
            currentOptionDeadline.innerText = jobdate[i];
            currentJobName = joblist[i];
            currentJobSystem = jobsystem[i];
            mainMenu.style.background = color_options[i];
            carousel.classList.remove("anim-previous");
        }, 650);
    };

    var result = document.querySelector('.output');
    var Arr = ['India', 'USA', 'China', 'Netherlands', 'Nepal', 'Japan', 'Australia']

    // auto complete function
    function autoComplete(Arr, Input) {
        return Arr.filter(e => e.toLowerCase().includes(Input.toLowerCase()));
    }

    function getValue(val) {
        console.log(val);
        // if no value
        if (!val) {
            result = '';
            return
        }
        // search goes here 
        var data = autoComplete(Arr, val);
        // append list data
        var res = '<ul>';
        data.forEach(e => {
            res += '<li>' + e + '</li>';
        })
        res += '</ul>';
        result = res;
    }

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
                                <span id="current-option-jobname" data-previous-text="" data-next-text=""></span>
                                <span id="current-option-information" data-previous-text="" data-next-text=""></span>
                                <span id="current-option-deadline" data-previous-text="" data-next-text=""></span>
                                <Button variant="outlined" id="EnrollBtn" onClick={UpdateP}>Enroll</Button>
                            </div>
                            <div id="image"></div>
                            <button id="previous-option" onClick={PreviousOption}></button>
                            <button id="next-option" onClick={NextOption}></button>
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