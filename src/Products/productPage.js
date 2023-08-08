import "../index.scss"
import { useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

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

function ProductRating({ rating }) {
    return (
        <p>
            <i className={"fa fa-star"} aria-hidden={"true"} />
            <span id={"product-rating"}>{rating}</span>
        </p>
    )
}

function ProductPrice({ price }) {
    return (
        <p id={"product-price"}>
            ${price}
        </p>
    )
}

function LeftBtn({ index, setIndex, limit}) {
    return (
        <button id={"btn-left"}
                className={"carousel-btn"}
                onClick={() => index - 1 > 0 ? setIndex(index - 1): setIndex(limit.current - 1)}>
            <i className={"fa fa-arrow-left"} aria-hidden={"true"} />
        </button>
    )
}

function RightBtn({ index, setIndex, limit}) {
    return (
        <button id={"btn-right"}
                className={"carousel-btn"}
                onClick={() => index < limit.current - 1 ? setIndex(index + 1): setIndex(0)}>
            <i className={"fa fa-arrow-right"} aria-hidden={"true"} />
        </button>
    )
}

function ProductImg({ src }) {
    return (
        <img alt={"img"} className={"carousel-img"} src={src}/>
    )
}

function Carousel({ images }) {
    const [ index, setIndex ] = useState(0)
    const [ currentImage, setCurrentImage] = useState(<ProductImg src={images[index]} />)
    const limit = useRef(images.length)

    useEffect(() => {
        setCurrentImage(<ProductImg src={images[index]} />)
    }, [index]);

    return (
        <div id={"carousel"} className={"product-carousel"}>
            <LeftBtn index={index} setIndex={setIndex} limit={limit}/>
            <RightBtn index={index} setIndex={setIndex} limit={limit}/>
            {currentImage}
        </div>
    )
}

export default function ProductPage() {
    const {product_id} = useParams()
    const [ product, setProduct ] = useState()

    const fetchProduct = () => {
        fetch(`https://dummyjson.com/products/${product_id}`)
            .then(res => res.json()).then(data => setProduct(data))
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div>
            {product &&
                <section className={"product-container"}>
                    <Carousel images={product.images}/>
                    <div className={"product-information"} id={"information"}>
                        <div id={"product-header"}>
                            <ProductTitle title={product.title}/>
                            <ProductCategory category={product.category}/>
                        </div>
                        <ProductDescription description={product.description}/>
                        <ProductRating rating={product.rating}/>
                        <ProductPrice price={product.price}/>
                    </div>
                </section>}
        </div>
    )
}