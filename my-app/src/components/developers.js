import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from '../firebase';
import "./developers.css"
const Developers = () => {
   
    return (
        <div class ="container">
            <div class="card">
                <div class="img-name">
                    <img src="Brian.jpg" />
                    <h2>Brian Truong</h2>
                </div>
                <div class="followers">
                    <h3>Senior at the University of Texas at Arlington</h3>
                </div>
                <div class="button-follow">
                    <button>Follow</button>
                </div>
            </div>

            <div class="card">
                <div class="img-name">
                    <img src="Lawr.png" />
                    <h2>Lawrence Wong</h2>
                </div>
                <div class="followers">
                    <h3>Senior at the University of Texas at Arlington</h3>
                </div>
                <div class="button-follow">
                    <button>Follow</button>
                </div>
            </div>

            <div class="card">
                <div class="img-name">
                    <img src="https://p7.hiclipart.com/preview/304/305/226/web-development-computer-icons-avatar-business-user-profile.jpg"></img>
                    <h2>Seth Rogers</h2>
                </div>
                <div class="followers">
                    <h3>Junior at the University of Texas at Arlington</h3>
                </div>
                <div class="button-follow">
                    <button>Follow</button>
                </div>
            </div>

            <div class="card">
                <div class="img-name">
                    <img src="Johnny.png" />
                    <h2>Johnny Nguyen</h2>
                </div>
                <div class="followers">
                    <h3>Junior at the University of Texas at Arlington</h3>
                </div>
                <div class="button-follow">
                    <button>Follow</button>
                </div>
            </div>

            <div class="card">
                <div class="img-name">
                    <img src="Chance1.png" />
                    <h2>Chance Huddleston</h2>
                </div>
                <div class="followers">
                    <h3>Senior at the University of Texas at Arlington</h3>
                </div>
                <div class="button-follow">
                    <button>Follow</button>
                </div>
            </div>

            <div class="card">
                <div class="img-name">
                    <img src="Chance.png" />
                    <h2>Professor Rosenkrantz </h2>
                </div>
                <div class="followers">
                    <h3>Professor at the University of Texas at Arlington</h3>
                </div>
                <div class="button-follow">
                    <button>Follow</button>
                </div>
            </div>

        </div>
   

    )
}
export default Developers;