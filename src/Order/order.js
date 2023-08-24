import {Navigate} from "react-router-dom";
import {useAuth} from "../Login/login";

export default function OrderPage() {
    const {authKey} = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        try {
            await fetch('http://localhost:3000/order/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Internship-Auth': authKey
                },
                body: JSON.stringify({
                    "order": {
                        "zip": data.get("zip"),
                        "street": data.get("street"),
                        "county": data.get("county"),
                        "city": data.get("city")
                    }
                })
            })

            return <Navigate to={"/user/orders"} replace={true} />
        } catch (err) { alert(err) }
    }

    return (
        <main className={"order-page-main"}>
            <form onSubmit={handleSubmit} className={"order-form"}>
                <div className={"order-container"}>
                    <label htmlFor={"zip"}>Email:</label>
                    <input type={"text"} id={"zip"} name={"zip"} required={true} />

                    <label htmlFor={"county"}>Username:</label>
                    <input type={"text"} id={"county"} name={"county"} required={true} />

                    <label htmlFor={"city"}>Password:</label>
                    <input type={"text"} id={"city"} name={"city"} required={true} />
                </div>
                <input type={"submit"} value={"Place order"}/>
            </form>
        </main>
    )
}