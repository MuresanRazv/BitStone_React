import React from "react";

export class Cart extends React.Component {
    constructor(authKey) {
        super(authKey);
        this.cartID = "64ca2f11625dd"
        this.cart = null
        this.state = {
            modified: false
        }
        this.authKey = authKey
    }

    async getCart() {
        // because I may want to get the cart when it's already fetched
        if (this.cart)
            return this.cart
        // because initially the cart is null
        else {
            // local cart may already be saved in local storage
            const localCart = localStorage.getItem("cart")
            if (localCart != null && !this.state.modified)
                return JSON.parse(localCart)
        }

        // fetch the cart
        this.cart = await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${this.cartID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',  'Internship-Auth': `${this.authKey}`}
        })
            .then(res => res.json())
        localStorage.setItem("cart", JSON.stringify(this.cart))
        this.setState({ modified: !this.state.modified})
        return this.cart
    }

    getStringOfProducts(products) {
        let stringOfProducts = ""
        for (let productId of products) {
            stringOfProducts += `products[]=${productId}&`
        }

        return stringOfProducts
    }

    /**
     * requestedProducts = [{
     *     id: number,
     *     quantity: number
     * }]
     *
     * toDelete = [id_1, ..., id_n]
     */
    async updateCart(requestedProducts, toDelete) {
        if (requestedProducts.length > 0) {
            this.cart = await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${this.cartID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Internship-Auth': `${this.authKey}` },
                body: JSON.stringify({
                    userId: 1,
                    products: requestedProducts
                })
            }).then(res => res.json())
            this.setState({ modified: true })
            this.cart = this.getCart()
        }

        if (toDelete.length > 0) {
            await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${this.cartID}?${this.getStringOfProducts(toDelete)}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Internship-Auth': `${this.authKey}`}
            }).then(res => res.json())
            this.setState({ modified: true })
            this.cart = this.getCart()
        }
    }
}