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
    //Our variables for the two different fields that we'll use later on to create sysmems and jobs
    const [user] = useAuthState(auth);
    const [SystemName, setSystemName] = useState("");
    const [SystemLead, setSystemLead] = useState("");
    const [SystemDescription, setSystemDescription] = useState("");
    const [Systemimg, setSystemimg] = useState("");

    const [SystemSelection, setSystemSelection] = useState("");
    const [SystemJobName, setSystemJobName] = useState("");
    const [Information, setInformation] = useState("");
    const [Deadline, setDeadline] = useState("");
    //creation of systems function
    const CreateS = () => {
        if (!SystemName || !SystemLead || !SystemDescription || !Systemimg) {
            alert("Please enter all the fields");
        }
        else {
            createSystem(SystemName, SystemLead, SystemDescription, Systemimg);
        }
    }
    //creation of jobs\tasks function
    const CreateJ = () => {
        if (!Deadline || !SystemJobName || !Information || !SystemSelection) {
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
        //console.log(user);
        addPosition(user, currentJobName, currentJobSystem);
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
    // const s = query(collection(db, "Systems"))
    // const unsubb = onSnapshot(s, (querySnapshot) => {
    //     const response = querySnapshot.docs.map(doc => doc.data());
    //     response.forEach(element => {
    //         var sysname = element.name;
    //         var syslead = element.systemlead;
    //         var sysdesc = element.Description;
    //         var sysimg = element.ImageURL;
    //         systemnames.push(sysname);
    //         systemlead.push(syslead);
    //         systemdescription.push(sysdesc);
    //         systemimg.push(sysimg);
    //     });
    //     var counter = 0; //needed a counter as we're implementing the promises due to javascript with its async functionality.
    //     systemnames.forEach(item => {
    //         let parentnode = document.getElementById("div1"); //make the parent node
    //         let child = document.createElement("div"); //make the child
    //         child.classList = "gallery__item"; //give the child the class (gallery__item) is what's used in CSS to make it all work across the board
    //         let system = document.createElement("div"); //giving the child some content
    //         system.classList = "SystemTitle"; //making a class for the title of the systems
    //         let titletext = document.createTextNode(item);
    //         system.appendChild(titletext); //appending the text to a div
    //         let systemphoto = document.createElement("img"); //creating an image for each carousel.
    //         systemphoto.classList = "System_Photo";
    //         systemphoto.src = systemimg[counter]; //just a placeholder for images that are specific to the system
    //         let systemdesc = document.createElement("div"); //making a div for the description for the systems
    //         systemdesc.classList = "System_Description";
    //         let desctext = document.createTextNode(systemdescription[counter]);
    //         systemdesc.appendChild(desctext); //appending the text to a div
    //         child.appendChild(system);
    //         child.appendChild(systemphoto);
    //         child.appendChild(systemdesc);
    //         parentnode.appendChild(child); // finally appending all the children nodes holding the content to the parent carousel card.
    //         counter += 1; //incrementing counter to ensure we pair the correct description + image with the system
    //     });
    // });
    // document.addEventListener('DOMContentLoaded', function () {
    //     var stream = document.querySelector('.gallery__stream');
    //     var items = document.querySelectorAll('.gallery__item');

    //     var prev = document.querySelector('.gallery__prev');
    //     prev.addEventListener('click', function () {
    //         stream.insertBefore(items[items.length - 1], items[0]);
    //         items = document.querySelectorAll('.gallery__item');
    //     });

    //     var next = document.querySelector('.gallery__next');
    //     next.addEventListener('click', function () {
    //         stream.appendChild(items[0]);
    //         items = document.querySelectorAll('.gallery__item');
    //     });
    // });
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
                    {/*                     
                    <div class="gallery">
                        <div class="gallery__prev"></div>
                        <div class="gallery__next"></div>
                        <div class="gallery__stream" id="div1">
                            <div id="testing" class="gallery__item">Thank you for looking through all of the jobs we have! </div>
                        </div>
                    </div> */}


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
                    <Button variant="outlined" name="addTaskBtn" onClick={CreateJ}>Create Job</Button>

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