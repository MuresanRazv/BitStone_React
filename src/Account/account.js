import './account.scss'
import {useEffect, useState} from "react";
import {useAuth} from "../Login/login";

export default function AccountPage() {
    const [user, setUser] = useState(),
        { authKey } = useAuth()

    useEffect(() => {
        fetch('http://localhost:3000/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Internship-Auth': `${authKey}`
                }
            }).then(res => res.json()).then(data => setUser(data))
    }, []);

    if (user !== undefined)
    return (
        <div className={"account-container"}>
            <h1>Account</h1>
            <div className={"account-information-container"}>
                <p>Name: {user.name}</p>
                <p>Username: {user.username}</p>
                <p>Age: {user.age}</p>
            </div>
            <div className={"account-buttons-container"}>
                <button>Change Password</button>
                <button>Delete Account</button>
            </div>
        </div>
    )
}