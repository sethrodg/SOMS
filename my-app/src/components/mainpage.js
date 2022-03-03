import React, { useState } from 'react';
import "./mainpage.css";

const MainPage = () => {
    return (
        /*create a job board */
        <div class="mainpage">
            <div class="mainpage__body">
                <div class="mainpage__header">
                    <h1>Welcome </h1>
                </div>
                <div class="mainpage__content">
                    <div class="joblist">
                        <ul>
                            <p>Job One</p>
                            <p>Job Two</p>
                            <p>Job Three</p>
                            <p>Job Four</p>
                            <p>Job Five</p>
                            <p>Job Six</p>
                            <p>Job Seven</p>
                        </ul>
                    </div>
                    <div class="jobdetail">
                        <div class="title">
                            <h2>Job Title</h2>
                        </div>
                        <div class="summary">
                            <h3>Job summary and location</h3>
                        </div>
                        <div class="description">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis volutpat arcu a pulvinar.
                                In maximus risus sed justo volutpat commodo. Praesent commodo augue sed lorem maximus tristique a at quam.
                                Pellentesque varius, magna ut commodo egestas, nisl dolor facilisis turpis, nec tristique ante arcu et eros.
                                In nec porta purus. Proin tempor diam eget tristique consectetur.
                                Praesent sed lectus eleifend orci efficitur volutpat in eget nisl. Mauris euismod, mauris eget volutpat interdum, sem risus efficitur magna,
                                quis maximus orci dolor id ante. Phasellus vestibulum varius est, ac rhoncus dui venenatis eu.
                                Donec faucibus, ligula a vestibulum ullamcorper, nibh ligula gravida elit, nec gravida sapien purus et metus.
                                Nunc in purus efficitur, hendrerit libero non, consectetur orci. Maecenas sit amet scelerisque risus.
                                In bibendum vestibulum pharetra. Morbi vel dictum tellus.</p>
                        </div>

                    </div>
                    {/* <div class="Header">
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
            </div> */}
                </div>
            </div>
        </div>
    );
}
export default MainPage;