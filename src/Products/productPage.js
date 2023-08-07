import "../index.css"
import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function ProductTitle({ title }) {
    return (
        <h1 id={"product-title"}>
            {title}
        </h1>
    )
}

function ProductCategory({ category }) {
    return (
        <p id={"product-category"}>
            {category}
        </p>
    )
}

function ProductDescription({ description }) {
    return (
        <p id={"product-description"}>
            {description}
        </p>
    )
}

function ProductRating() {
    return (
        <p>
            <i className={"fa fa-star"} aria-hidden={"true"} />
            <span id={"product-rating"}></span>
        </p>
    )
}

function ProductPrice({ price }) {
    return (
        <p id={"product-price"}>
            {price}
        </p>
    )
}

function LeftBtn() {
    return (
        <button id={"btn-left"} className={"carousel-btn"}>
            <i className={"fa fa-arrow-left"} aria-hidden={"true"} />
        </button>
    )
}

function RightBtn() {
    return (
        <button id={"btn-right"} className={"carousel-btn"}>
            <i className={"fa fa-arrow-right"} aria-hidden={"true"} />
        </button>
    )
}

function ProductImages({ images }) {
    return images.map((image, index) => (
                <image id={index} className={"carousel-img"} href={image} />
            ))
}

export default function ProductPage() {
    const {product_id} = useParams()
    const [ product, setProduct ] = useState(null)

    useEffect(() => {
        fetchProduct()
    }, []);

    const fetchProduct = () => {
        fetch(`https://dummyjson.com/products/${product_id}`)
            .then(res => res.json()).then(data => {
            setProduct(data.products)
        })
    }

    return (
        <section className={"product-container"}>
            <div id={"carousel"} className={"product-carousel"}>
                <LeftBtn/>
                <RightBtn/>
                <ProductImages images={product.images}/>
            </div>
            <div className={"product-information"} id={"information"}>
                <div id={"product-header"}>
                    <ProductTitle title={product.title}/>
                    <ProductCategory category={product.category}/>
                </div>
                <ProductDescription description={product.description}/>
                <ProductRating/>
                <ProductPrice price={product.price}/>
            </div>
        </section>
    )
}