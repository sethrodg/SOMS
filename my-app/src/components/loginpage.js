import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Google } from '@mui/icons-material';
import {
    auth,
    signInWithGoogle,
    logInWithEmailAndPassword,
    sendPasswordReset
} from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const paperStyle = { padding: 20, height: '70vh', width: 400, margin: "20px auto" }
    const btnstyle = { backgroundColor: '#F89286', margin: '8px 0px' }
    const textStyle = { margin: '8px 0px' }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen 
            //testing commit
            return;
        }
        if (user) navigate("/");
    }, [user, loading]);
    const log = () => {
        if (!email) alert("Please enter email");
        logInWithEmailAndPassword(email, password);
    };
    const reset = () => {
        if (!email) alert("Please enter email");
        sendPasswordReset(email);
    };
    return (
        <Grid container style={{ minHeight: '90vh' }}>
            <Grid container alignItems='center' direction='column' sm={6}>
                <img src="utalogo.png" />    
            </Grid>
            <Grid container item alignItems='center' direction='column' justify="space-between" xs={12} sm={6} style={{ padding: 10}}>
                <Paper sx={{ borderRadius: 10 }} elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <h1>Login to SOMS</h1>
                    </Grid>
                    <Typography>
                        Email
                    </Typography>
                    <input
                        type="text"
                        className="register__textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                        style={textStyle}
                        variant="outlined"
                        fullWidth required
                    />
                    <Typography>
                        Password
                    </Typography>
                    <input
                        type="password"
                        className="register__textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        style={textStyle}
                        variant="outlined"
                        fullWidth required
                    />
                    <Typography>
                        <Link align='right' onClick={reset}>
                            Forgot Password
                        </Link>
                    </Typography>
                    <Button color='primary' variant="contained" onClick={log} style={btnstyle} fullWidth>Log In</Button>
                    <hr></hr>
                    <Typography> Don't have an account yet?
                        <div class="signupbutton">
                            <Link href='signup'>
                                <Button variant="outlined">Sign Up</Button>
                            </Link>
                        </div>
                    </Typography>
                    {/* <Button variant="outlined" startIcon={<Google />} onClick={signInWithGoogle} >Continue with Google</Button> */}
                </Paper>
            </Grid>
        </Grid>
    )
}
export default Login