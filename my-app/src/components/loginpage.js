import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Google } from '@mui/icons-material';
import { registerWithEmailAndPassword } from '../firebase';
const Login = () => {

    const paperStyle = { padding: 20, height: '70vh', width: 400, margin: "20px auto" }
    const btnstyle = { backgroundColor: '#F89286', margin: '8px 0px' }
    const textStyle = { margin: '8px 0px' }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const log = () => {
        if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
    };
    return (
        <Grid container style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={6} style={{ align: 'center' }}>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper sx={{ borderRadius: 10 }} elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <h1>Welcome to SOMS</h1>
                    </Grid>
                    <Typography>
                        Username
                    </Typography>
                    <input
                        type="text"
                        className="register__textBox"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        style={textStyle}
                        variant="outlined"
                        fullWidth required
                    />
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
                        <Link align='right' href='#'>
                            Forgot Password
                        </Link>
                    </Typography>
                    <Button  type='Submit' color='primary' variant="contained" onClick = {log} style={btnstyle} fullWidth>Log In</Button>
                    <hr></hr>
                    <Typography> Don't have an account yet?
                        <div class="signupbutton">
                            <Link href='signup'>
                                <Button variant="outlined">Sign Up</Button>
                            </Link>
                        </div>
                    </Typography>
                    <Button variant="outlined" startIcon={<Google />} >Continue with Google</Button>
                </Paper>
            </Grid>
        </Grid>
    )
}
export default Login