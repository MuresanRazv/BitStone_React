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
    baseQuery: fetchBaseQuery({ baseUrl: 'https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart'}),
    endpoints: builder => ({
        getCart: builder.query({
            query: (authKey) => ({
                url: `/64c38597d8f95`,
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Internship-Auth': `${authKey? authKey.data.token: "" }`}
            })
        }),

        updateCart: builder.mutation({
            query: (props) => ({
                url: `/64c38597d8f95`,
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Internship-Auth': `${props.key}`},
                body: {
                    userId: 1,
                    products: props.product
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