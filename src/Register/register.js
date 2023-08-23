import {useAuth} from "../Login/login";
import {Navigate} from "react-router-dom";
import './register.scss'

function RegisterForm() {
    const { login } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        try {
            await fetch('http://localhost:3000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": data.get("email"),
                    "username": data.get("username"),
                    "password": data.get("password"),
                    "name": data.get("name"),
                    "age": data.get("age")
                })
            }).then(res => res.json()).then(data => login(data))

            return <Navigate to={"/user/account"} replace={true} />
        } catch (err) { alert(err) }
    }

    return (
        <div className={"register-container"}>
            <form onSubmit={handleSubmit} className={"register-form"}>
                <div className={"input-container"}>
                    <label htmlFor={"email"}>Email:</label>
                    <input type={"text"} id={"email"} name={"email"} required={true} />

                    <label htmlFor={"username"}>Username:</label>
                    <input type={"text"} id={"username"} name={"username"} required={true} />

                    <label htmlFor={"password"}>Password:</label>
                    <input type={"password"} id={"password"} name={"password"} required={true} />

                    <label htmlFor={"name"}>Name:</label>
                    <input type={"text"} id={"name"} name={"name"} required={true} />

                    <label htmlFor={"age"}>Age:</label>
                    <input type={"number"} id={"age"} name={"age"} />
                </div>
                <input type={"submit"} value={"Register"}/>
            </form>
        </div>
    )
}

export default function Register() {
    const { authKey } = useAuth()
    if (authKey)
        return <Navigate to={"/user/account"} replace={true} />

    return (
        <RegisterForm />
    )
}