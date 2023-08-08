import './login.scss'
import {Navigate, useNavigate} from "react-router-dom";
import {createContext, useContext, useMemo, useState} from "react";
import {useLocalStorage} from "./useLocalStorage";
const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [authKey, setAuthKey] = useLocalStorage("user", null);
    const navigate = useNavigate();
    // test7@mail.com
    // 08x3Tz6sa5@Kl&AJJqty4sBn
    const login = async (data) => {
        setAuthKey(data);
        if (data != null)
            navigate("/account")
    }

    const logout = () => {
        setAuthKey(null)
        navigate("/", { replace: true })
    }

    const value = useMemo(
        () => ({
            authKey,
            login,
            logout
        }),
        [authKey]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
};

function LoginForm() {
    const { login, authKey } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        // because I need to fetch auth key using email and password
        await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": data.get("email"),
                "password": data.get("password")
            })
        }).then(res => res.json()).then(data => login({data}))
    }

    if (authKey)
        return <Navigate to={"/account"}/>

    return (
        <div className={"login-container"}>
            <form onSubmit={handleSubmit} className={"login-form"}>
                <div className={"input-container"}>
                    <label htmlFor={"email"}>Email:</label>
                    <input type={"text"} id={"email"} name={"email"} required={true}/>
                </div>
                <div className={"input-container"}>
                    <label htmlFor={"password"}>Password:</label>
                    <input type={"password"} id={"password"} name={"password"} required={true}/>
                </div>
                <input type={"submit"} value={"Login"}/>
            </form>
        </div>
    )
}

export default function Login() {
    return (
        <LoginForm />
    )
}