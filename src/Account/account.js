import './account.scss'

export default function AccountPage() {

    return (
        <div className={"account-container"}>
            <h1>Account</h1>
            <div className={"account-information-container"}>
                <p>Name: Muresan</p>
                <p>Surname: Razvan</p>
            </div>
            <div className={"account-buttons-container"}>
                <button>Change Password</button>
                <button>Delete Account</button>
            </div>
        </div>
    )
}