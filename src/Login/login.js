import './login.scss'
import {Navigate, useNavigate} from "react-router-dom";
import {createContext, useContext, useMemo} from "react";
import {useLocalStorage} from "./useLocalStorage";
const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [authKey, setAuthKey] = useLocalStorage("user", null);
    const navigate = useNavigate();

    // test7@mail.com
    // 08x3Tz6sa5@Kl&AJJqty4sBn
    const login = async (data) => {
        if (!data.data.token)
            throw new Error("Invalid password or email!")
        setAuthKey(data);
        navigate("/user/account")
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
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        try {
            // because I need to fetch auth key using email and password
            await fetch('127.0.0.1:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": data.get("email"),
                    "password": data.get("password")
                })
            }).then(res => res.json()).then(data => login({data}))

            return <Navigate to={"/user/account"} replace={true}/>
        } catch (err) { alert(err) }
    }

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
    const { authKey } = useAuth()
    if (authKey)
        return <Navigate to={"/user/account"} replace={true}/>

    return (
        <LoginForm />
    )
}