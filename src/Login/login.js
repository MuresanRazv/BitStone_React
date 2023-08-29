import './login.scss'
import {Link, Navigate, useNavigate} from "react-router-dom";
import {createContext, useContext, useMemo} from "react";
import {useLocalStorage} from "./useLocalStorage";
const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [authKey, setAuthKey] = useLocalStorage("user", null),
        navigate = useNavigate();

    const login = async (data) => {
        if (data.message)
            throw new Error(data.message)
        setAuthKey(data);
        navigate("/user/account")
    }

    const logout = async () => {
        setAuthKey(null)
        await fetch('http://localhost:3000/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate("/", {replace: true})
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
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        try {
            // because I need to fetch auth key using email and password
            await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": data.get("email"),
                    "password": data.get("password")
                })
            }).then(res => res.json()).then(data => login(data))

            return <Navigate to={"/user/account"} replace={true}/>
        } catch (err) { alert(err) }
    }

    return (
        <div className={"login-container"}>
            <form onSubmit={handleSubmit} className={"login-form"}>
                <div className={"input-container"}>
                    <label className={"input-label"} htmlFor={"email"}>Email</label>
                    <input className={"input-box"} type={"text"} id={"email"} name={"email"} required={true}/>
                </div>
                <div className={"input-container"}>
                    <label className={"input-label"} htmlFor={"password"}>Password</label>
                    <input className={"input-box"} type={"password"} id={"password"} name={"password"} required={true}/>
                </div>
                <div className={"btn-container"}>
                    <input className={"form-btn login-btn"} type={"submit"} value={"Login"}/>
                    <button className={"form-btn"}>
                        <Link to={"/register"} className={"create-account-btn"}>
                            Create Account
                        </Link>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default function Login() {
    const { authKey } = useAuth()
    if (authKey)
        return <Navigate to={"/user/account"} replace={true}/>

    return (
        <LoginForm />
    )
}