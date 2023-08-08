import {Link} from "react-router-dom";
import "./homepage.css"

export default function Homepage() {

    return (
        <div className={"homepage-container"}>
            <h1>Razvan's shop</h1>
            <p>Welcome to my shop, good price, even better value!</p>
            <Link to={"/products"}>
                <button>Shop here!</button>
            </Link>
        </div>
    )
}