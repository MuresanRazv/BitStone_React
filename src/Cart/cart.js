import React from "react";

export class Cart extends React.Component {
    constructor(authKey, setCart) {
        super(authKey);
        this.cartID = "64ca2f11625dd"
        this.cart = null
        this.authKey = authKey
        this.setCart = setCart
    }

    state = {
        modified: false
    }

    modifying = (modified) => {
        this.setState({
            modified: !modified
        })
    }

    async getCart() {
        // fetch the cart
        this.cart = await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${this.cartID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',  'Internship-Auth': `${this.authKey}`}
        })
            .then(res => res.json())
        this.setCart(this.cart)
        this.modifying(this.state.modified)

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
            this.modifying(this.state.modified)
            this.getCart(this.setCart)
        }

        if (toDelete.length > 0) {
            await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${this.cartID}?${this.getStringOfProducts(toDelete)}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Internship-Auth': `${this.authKey}`}
            }).then(res => res.json())
            this.modifying(this.state.modified)
            this.getCart(this.setCart)
        }
    }
}