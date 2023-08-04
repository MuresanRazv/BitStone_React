import './index.css'

export default function Header() {
    return (
        <header id={"header"}>
            <div className={"container"}>
                <h3>Razvan's shop</h3>
                <nav>
                    <ul>
                        <li><a id="cart-btn"><i className="fa fa-shopping-cart" aria-hidden="true"></i>
                            <span id="cart-nr"></span></a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}