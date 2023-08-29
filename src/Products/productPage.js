import "../main/index.scss"
import { useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import RatingPopUp, {Rating} from "./rating";
import {useAuth} from "../Login/login";

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
        <p style={{textAlign: "center"}}>
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

function ProductRatingCard({ rating, setRatings, productID }) {
    const userID = useSelector((state) => state?.cart?.cart?.userId)
    const {authKey} = useAuth();

    const handleRemove = async () => {
        await fetch(`http://localhost:3000/reviews/${rating._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Internship-Auth': authKey
            },
            body: JSON.stringify({
                productID: productID
            })
        })
        fetch(`http://localhost:3000/reviews/${productID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then(ratings => setRatings(ratings))
    }

    return (
        <div className={"product-rating-card-container"}>
            <button className={"rating-delete-btn"} onClick={handleRemove}>
                <i className="fa fa-times" aria-hidden="true"></i>
            </button>
            <h3>{rating.title}</h3>
            <small className={"rating-username"}>By {rating.userID !== userID ? rating.username: "You"}</small>
            <p>{rating.description}</p>
            <ProductRating rating={rating.rating}/>
        </div>
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
    const [ ratings, setRatings ] = useState([])

    const fetchProduct = () => {
        fetch(`http://localhost:3000/products/product?id=${product_id}`)
            .then(res => res.json()).then(data => setProduct(data))
    }

    const fetchRatings = () => {
        fetch(`http://localhost:3000/reviews/${product_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => res.json()).then((data) => setRatings(data))
    }

    useEffect(() => {
        fetchProduct()
        fetchRatings()
    }, [])

    return (
        <>
            <div className={"product-page-container"}>
                {product &&
                    <>
                        <section className={"product-container"}>
                            <Carousel images={product.images}/>
                            <div className={"product-information"} id={"information"}>
                                <div id={"product-header"}>
                                    <ProductTitle title={product.title}/>
                                    <ProductCategory category={product.category}/>
                                </div>
                                <ProductDescription description={product.description}/>
                                <Rating product={product} />
                                <ProductPrice price={product.price}/>
                            </div>
                        </section>
                        <div className={"product-page-ratings-container"}>
                            {ratings.map((rating) => <ProductRatingCard productID={product_id} setRatings={setRatings} rating={rating} />)}
                        </div>
                    </>}
            </div>
            <RatingPopUp />
        </>
    )
}