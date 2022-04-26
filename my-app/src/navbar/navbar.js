import React from "react";
import { Button, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import { logout } from "../firebase";
import "./navbar.css";
import {
    Navbar,
    Nav
} from "react-bootstrap";
const navbar = () => {
    const logO = () => {
        logout();
    };
    return (
        <div class="navbarbody">
            <div class = "testing">
                    <nav id="myNavbar" class="navbar navbar-default navbar-inverse navbar-fixed-top" role="navigation">
                    {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                    <div class="container">
                        {/* <!-- Menu responsivo --> */}
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbarCollapse">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
                            </button>
                            {/* <!-- Logo --> */}
                            <a class="navbar-brand myLogo" href="/"><span>SOMS</span></a>
                        </div>

                        {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                        <div class="collapse navbar-collapse" id="navbarCollapse">
                            <ul class="nav navbar-nav navbar-right">
                                <li><a href="/">Home</a></li>
                                <li><a href="/explore">Explore</a></li>
                                <li><a href="/developers">Developers</a></li>
                                <li><a href="/login">Login</a></li>
                                <li><a href="/signup">Signup</a></li>
                                <li><a href="/" onClick={logO}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div >
    );
}
export default navbar;