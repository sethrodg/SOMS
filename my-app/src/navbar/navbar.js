import React from "react";
import "./navbar.css";
import {
    Navbar,
    Nav
} from "react-bootstrap";
const navbar = () => {
    return (
        <div class="Body">
            <div class = "home">
                <Nav.Link href="/home">
                    <p>Home</p>
                </Nav.Link>
            </div>
            <div class = "login">
                <Nav.Link href="/login">
                    <p>Login</p>
                </Nav.Link>
            </div>
        </div>
    );
} 
export default navbar;