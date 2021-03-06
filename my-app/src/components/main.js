import { Button, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
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
    createAnnouncement,
    addPosition,
} from '../firebase';
function Pop() {
    //Our variables for the two different fields that we'll use later on to create sysmems and jobs

    let select = document.getElementById("selectSystems"); //Will appear twice in the dropdown
    let joblist = [];
    let jobinfo = [];
    let jobsystem = [];
    let jobdate = [];

    let announcementType = [];
    let announcement = [];

    let currentJobName = "";
    let currentJobSystem = "";

    /**
     * @Function unsub
     * @description Fill arrays with elements from Database to push to Job Carousel
     * @var joblist: Job Name
     * @var jobinfo: Job Information
     * @var jobsystem: System Name the job belongs to
     * @var jobdate Job due date
     */
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
    /**
     * @function unsubb
     * @description Create Dropdown for reading the current systems from Database. This is used for Job Creation 
     */
    const s = query(collection(db, "Systems"))
    const unsubb = onSnapshot(s, (querySnapshot) => {
        const response = querySnapshot.docs.map(doc => doc.data());
        response.forEach(element => {
            var opt = element.name;
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);

            //This function removes duplicates from the SELECT list
            [].slice.call(select.options)
                .map(function (a) {
                    if (this[a.value]) {
                        select.removeChild(a);
                    } else {
                        this[a.value] = 1;
                    }
                }, {});


        });
    });
    /**
     * @function unsubbb
     * @summary Push Announcements from Database to Announcement Carousel
     */
    const a = query(collection(db, "Announcement"))
    const unsubbb = onSnapshot(a, (querySnapshot) => {
        const response = querySnapshot.docs.map(doc => doc.data());
        response.forEach(element => {
            announcementType.push(element.AnnouncementType);
            announcement.push(element.Announcement);
        });
    });

    //Our variables for the two different fields that we'll use later on to create systems and jobs
    const [user] = useAuthState(auth);
    const [SystemName, setSystemName] = useState("");
    const [SystemLead, setSystemLead] = useState("");
    const [SystemDescription, setSystemDescription] = useState("");
    const [Systemimg, setSystemimg] = useState("");
    const [currentUser, setcurrentUser] = useState("");
    const [SystemSelection, setSystemSelection] = useState("");
    const [SystemJobName, setSystemJobName] = useState("");
    const [Information, setInformation] = useState("");
    const [Deadline, setDeadline] = useState("");

    const [AnnouncementType, setAnnouncementType] = useState("");
    const [Announcement, setAnnouncement] = useState("");

    /**
     * @description Buffer to prevent empty fields from being passed to createAnnouncement
     */
    const CreateA = () => {
        if (!AnnouncementType || !Announcement) {
            alert("Please enter all the fields");
        }
        else {
            createAnnouncement(AnnouncementType, Announcement);
        }
    }

    /**
     * @description Buffer to prevent empty fields being passed to CreateSystem
     */
    const CreateS = () => {
        if (!SystemName || !SystemLead || !SystemDescription || !Systemimg) {
            alert("Please enter all the fields");
        }
        else {
            createSystem(SystemName, SystemLead, SystemDescription, Systemimg);
        }
    }
    
    /**
     * @description Buffer to prevent empty fields being passed to CreateJob
     */
    const CreateJ = () => {
        if (!Deadline || !SystemJobName || !Information || !SystemSelection) {
            alert("Please enter all the fields");
        }
        else {
            createJob(SystemSelection, SystemJobName, Information, Deadline);
        }
    };

    /**
     * @function UpdateP
     * @summary update the user's positions that they're enrolled in as well as the systems they're interested in
     */
    const UpdateP = () => {
        console.log("something");
        if (!user) {
            console.log("no user");
            alert("Please sign in to update your positions");
        }
        else {
            addPosition(user, currentJobName, currentJobSystem);
        }
    }
    if (user) { //check if user is logged in
        var email = user.email;
        var admin = false;
        if (email.slice(-8).includes("@uta.edu")) {
            //checks to see if the last characters have the correct email for admin privledges
            admin = true;
        }
        console.log(admin)
        var Welcome = "Welcome " + email; //setting the welcome message to be paired with the user's email
    }
    else { //if not logged in
        var Welcome = "Welcome Guest";
        var email = ""; //setting the email to be blank as there's no current user
    }

    //if the user is an admin then we'll have to hide the system creation as well as the job creation
    const testingtasking = document.getElementsByClassName("Tasking");
    const testingjobs = document.getElementsByClassName("Jobs");
    //testingtasking.style.background = "#FE9968"; //this doesn't work, cannot use .style to try and alter css for that specific class = we can't hide it this way
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
    //prepping for transfer of vertical carousel to the horizontal one that we have in the explore page as it's easier to look through the list
    //the current option in this case would be the third one from the first one ie(0,1,2). 2 would be the one that the user sees and is the one that's front and center
    return (
        <>

            <div className="filloutpage">
                <div>
                    <h3 className="pop_nf_h3">{Welcome}</h3>
                </div>
                {/* <div class="gallery">
                    <div class="gallery__prev"></div>
                    <div class="gallery__next"></div>
                    <div class="gallery__stream" id="div1">
                        <div id="testing" class="gallery__item">Thank you for looking through all of the jobs we have! </div>
                    </div>
                </div> */}
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

                    <div class="Announcements">
                        <h1 class="copyCenter">Announcements</h1>
                        <div class="box warning" >
                            <div class="closeArea" id="warning"><p class="copyRight"></p></div>
                            <div class="copyArea"><p><strong>Urgent Notice:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, commodi.</p></div>
                        </div>

                        <div class="box warning" >
                            <div class="closeArea" id="warning"><p class="copyRight"></p></div>
                            <div class="copyArea"><p><strong>Weather Announcement:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, commodi.</p></div>
                        </div>

                        <div class="box warning" >
                            <div class="closeArea" id="warning"><p class="copyRight"></p></div>
                            <div class="copyArea"><p><strong>Sign up for our newsletter!</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, commodi.</p></div>

                        </div>

                        <div class="box warning" >
                            <div class="closeArea" id="warning"><p class="copyRight"></p></div>
                            <div class="copyArea"><p><strong>Hours Update:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, commodi.</p></div>
                        </div>
                        <Button variant="outlined" id="AnnouncementBtn" name="addTaskBtn" onClick={CreateA}>Create Announcement</Button>
                        <input
                            type="text"
                            className="AnnouncementType"
                            value={AnnouncementType}
                            onChange={(e) => setAnnouncementType(e.target.value)}
                            placeholder="Enter Announcement Type"
                        />
                        <input
                            type="text"
                            className="Announcement"
                            value={Announcement}
                            onChange={(e) => setAnnouncement(e.target.value)}
                            placeholder="Enter Announcement"
                        />
                    </div>
                </div>

                <div className="Tasking">
                    <Button variant="outlined" id="TaskBtn" name="addTaskBtn" onClick={CreateS}>Create System</Button>
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
                    <input
                        type="text"
                        className="Systemimage"
                        value={Systemimg}
                        onChange={(e) => setSystemimg(e.target.value)}
                        placeholder="Enter System Image url"
                    />
                    <textarea className="SystemDescription" rows="4" cols="25" value={SystemDescription} onChange={(e) => setSystemDescription(e.target.value)} placeholder="Enter System Description">
                    </textarea>
                </div>

                <div className="Jobs">
                    <Button variant="outlined" id="CreateJobBtn" name="addTaskBtn" onClick={CreateJ}>Create Job</Button>

                    <select id="selectSystems" onChange={(e) => setSystemSelection(e.target.value)}>
                        <option>--Choose System--</option>
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