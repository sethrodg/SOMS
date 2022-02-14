import React from 'react';
import "./mainpage.css";
const MainPage = () =>{
    return (
        /*create a job board */
        <div class="mainpage">
            <div class="Header">
                <h1>Job Board</h1>
            </div>
            <div class="job-list">
                <div class="card1">
                    <div class="container">
                        <h4><b>Job Title</b></h4>
                        <p>Job Description</p>
                        <button type="submit">Apply</button>
                    </div>
                </div>
                <div class="card2">
                    <div class="container">
                        <h4><b>Job Title</b></h4>
                        <p>Job Description</p>
                        <button type="submit">Apply</button>
                    </div>
                </div>
                <div class="card3">
                    <div class="container">
                        <h4><b>Job Title</b></h4>
                        <p>Job Description</p>
                        <button type="submit">Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MainPage;