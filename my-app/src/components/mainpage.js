import React from 'react';
import "./mainpage.css";
const MainPage = () =>{
    return (
        /*create a job board */
        <div className="mainpage">
            <div className="mainpage-header">
                <h1>Job Board</h1>
            </div>
            <div className="mainpage-body">
                <div className="mainpage-body-left">
                    <div className="mainpage-body-left-header">
                        <h2>Job Listings</h2>
                    </div>
                    <div className="mainpage-body-left-body">
                        <div className="mainpage-body-left-body-job">
                            <div className="mainpage-body-left-body-job-header">
                                <h3>Software Engineer</h3>
                            </div>
                            <div className="mainpage-body-left-body-job-body">
                                <div className="mainpage-body-left-body-job-body-company">
                                    <h4>Company Name</h4>
                                </div>
                                <div className="mainpage-body-left-body-job-body-location">
                                    <h4>Location</h4>
                                </div>
                                <div className="mainpage-body-left-body-job-body-description">
                                    <h4>Description</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MainPage;