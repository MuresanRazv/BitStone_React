import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

function getStringOfProducts(products) {
    let stringOfProducts = ""
    for (let product of products) {
        stringOfProducts += `products[]=${product.id}&`
    }

    return stringOfProducts
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/cart'}),
    endpoints: builder => ({
        getCart: builder.query({
            query: (authKey) => ({
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Internship-Auth': `${authKey? authKey: "" }`}
            })
        }),

        updateCart: builder.mutation({
            query: (props) => ({
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Internship-Auth': `${props.key}`},
                body: {
                    "products": props.products
                }
            })
        }),

        removeFromCart: builder.query({
            query: (cartID, authKey, toDelete) => ({
                url: `/${cartID}?${getStringOfProducts(toDelete)}`,
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Internship-Auth': `${authKey}`},
            })
        })
    })
})

export const {
    useGetCartQuery,
    useUpdateCartMutation,
    useRemoveFromCartMutation
} = apiSlice