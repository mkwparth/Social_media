import axios from "axios";
import { useRef } from "react"
 
import "./register.css"
import { useNavigate,Link } from "react-router-dom";
export default function Login() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(passwordAgain.current.value );
        console.log(password.current.value );

        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Pasword doesn't match")
        }
        else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                axios.post("http://localhost:8800/api/auth/register", user);
                navigate("/login");

            } catch (err) {
                console.log(err);
            }
        }
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
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input placeholder="Username" required type="text" ref={username} className="loginInput" />
                        <input placeholder="Email" required type="email" ref={email} className="loginInput" />
                        <input placeholder="Password" required type="password" ref={password} className="loginInput" minLength="6" />
                        <input placeholder="Re-enter Password" required type="password" ref={passwordAgain} className="loginInput" minLength="6" />
                        <button className="loginButton" type="submit">
                            Sign Up
                        </button>
                        <Link to="/login">
                        <button className="loginRegisterButton">
                            Already have an account?
                        </button>
                        </Link>

                    </form>
                </div>
            </div>

        </div>
    )
}
