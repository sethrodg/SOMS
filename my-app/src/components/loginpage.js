import React from 'react';
import "./loginpage.css";
const Login= () =>{
    return (
        <div class="Background">
            <div class="loginpage">
                <div class="login">
                    <h1>Login</h1>
                    <form>
                        <div class ="loginform">
                            <input type="text" placeholder="Username"></input>
                            <input type="password" placeholder="Password"></input>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
                <div class="signup">
                    <h1>Sign Up</h1>
                    <form>
                        <div class ="signupform">
                            <input type="text" placeholder="Username"></input>
                            <input type="password" placeholder="Password"></input>
                            <input type="password" placeholder="Confirm Password"></input>
                            <button type="submit">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }
  export default Login;