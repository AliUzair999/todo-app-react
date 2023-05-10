import { useState } from "react"
import {auth} from "../../config/firebase"
import {signInWithEmailAndPassword} from "firebase/auth"
import {useNavigate} from 'react-router-dom'

export default function Login(props) {
    const [loginData, setLoginData] = useState({email:"ali@uzair.com", password:123456})
    const navigate = useNavigate()

    const updateLoginData = (key, value) => {
        setLoginData({...loginData, [key]: value})
    }

    const signin = async () => {
        try {
            const signinRes = await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            // console.log(signinRes)

            // props.setPage("dashboard")
            alert("successfully Logged In")
            navigate('/dashboard', {replace: true})
        }
        catch(err){
            console.log(err)
        }


    }


    return <>
    <h3>Login Page</h3>
    <input
    type="text"
    placeholder="Email"
    value={loginData.email}
    onChange={(e) => {
        updateLoginData("email", e.target.value)
    }}
    ></input>

    <input
    type="password"
    placeholder="Password"
    value={loginData.password}
    onChange={(e) => {
        updateLoginData("password", e.target.value)
    }}
    ></input>

    <button onClick={signin}>Log me In</button>
    </>
}