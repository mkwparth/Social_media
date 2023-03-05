import { useContext, useRef } from "react";
import "./login.css"
import { logincall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom"

export default function Login() {


    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        logincall({ email: email.current.value, password: password.current.value }, dispatch)
    }
    
    return (
        <div className="login" >
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">
                        WhichSocial
                    </h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on WhichSocial.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" className="loginInput" required ref={email} />
                        <input placeholder="Password" type="password" className="loginInput" required ref={password} minLength="6" />
                        <button className="loginButton" disabled={isFetching}>
                            {isFetching ?
                                <CircularProgress style={{ color: "white" }} size="20px" /> : "Log In"}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to="/register">

                            <button className="loginRegisterButton" disabled={isFetching}>
                                {isFetching ?
                                    <CircularProgress style={{ color: "white" }} size="20px" /> : "Create a New Account"}
                            </button>
                        </Link>
                    </form>
                </div>
            </div>

        </div>
    )
}
