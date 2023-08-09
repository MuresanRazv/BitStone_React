import React from "react";

export class Cart extends React.Component {
    constructor(authKey, setCart) {
        super(authKey);
        this.cartID = "64c38597d8f95"
        this.cart = null
        this.authKey = authKey
        this.setCart = setCart
    }

    setKey(newKey) {
        this.authKey = newKey
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
        if (this.authKey) {
            // fetch the cart
            this.cart = await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${this.cartID}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Internship-Auth': `${this.authKey}`}
            })
                .then(res => res.json())
            this.setCart(this.cart)
            this.modifying(this.state.modified)
        }
    }

    getStringOfProducts(products) {
        let stringOfProducts = ""
        for (let product of products) {
            stringOfProducts += `products[]=${product.id}&`
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
        if (requestedProducts !== null && requestedProducts.length > 0) {
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

        if (toDelete && toDelete.length > 0) {
            await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${this.cartID}?${this.getStringOfProducts(toDelete)}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Internship-Auth': `${this.authKey}`}
            }).then(res => res.json())
            this.modifying(this.state.modified)
            this.getCart(this.setCart)
        }
    }

    async handlePlus(product) {
        if (this.authKey) await this.updateCart([{id: Number(product.id), quantity: 1}])
    }
    async handleMinus(product) {
        let toDelete = []
        if (this.cart) for (let currentProduct of this.cart.products)
            if (currentProduct.id === product.id && currentProduct.quantity - 1 <= 0) {
                toDelete.push(product)
                break
            }

        if (toDelete.length > 0) await this.updateCart([], toDelete)
        else await this.updateCart([{id: Number(product.id), quantity: -1}])
    }

    async emptyCart() {
        if (this.cart !== null) {
            const toDelete = this.getStringOfProducts(this.cart.products)
            await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${this.cartID}?${this.getStringOfProducts(toDelete)}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Internship-Auth': `${this.authKey}`}
            }).then(res => res.json())
            this.modifying(this.state.modified)
            this.getCart(this.setCart)
        }
    }
}