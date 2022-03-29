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
        <div class="Body">
            <div class="home">
                <Nav.Link href="/">
                    <Button variant="outlined" >Home</Button>
                </Nav.Link>
            </div>
            <div class="explore">
                <Nav.Link href="/explore">
                    <Button variant="outlined" >Explore</Button>
                </Nav.Link>
            </div>
            <div class="login">
                <Nav.Link href="/login">
                    <Button variant="outlined" >Login</Button>
                </Nav.Link>
            </div>
            <div class="signup">
                <Nav.Link href="/signup">
                    <Button variant="outlined" >signup</Button>
                </Nav.Link>
            </div>
            <div class="logout">
                <Nav.Link href="/">
                    <Button variant="outlined" onClick={logO} >Log out</Button>
                </Nav.Link>
            </div>
        </div >
    );
}
export default navbar;