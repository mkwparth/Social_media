import axios from "axios";

export const logincall = async (userCredientials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post("http://localhost:8800/api/auth/login", userCredientials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
        console.log(res.data)

    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
}