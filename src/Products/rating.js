import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPopUp} from "./Slices/ratingPopUpSlice";
import {addRating} from "./Slices/ratingsSlice";
import {setProduct} from "./Slices/productSlice";
import {useAuth} from "../Login/login";

export function Rating({ product }) {
    const [ starIndex, setStarIndex ] = useState(-1)
    const dispatch = useDispatch()

    const avg = useSelector((state) => {
        const productRatings = state.ratings.filter((rating) => rating.productID === product.id)
        let total = 0
        for (let productRating of productRatings)
            total += productRating.rating
        return (total / productRatings.length).toFixed(2)
    })

    const stars = Array.from({ length: 5 }).map((_, index) => (
        <i
            key={index}
            className={index <= starIndex ? "fa fa-star star": "fa fa-star-o star"}
            aria-hidden="true"
            onMouseEnter={() => setStarIndex(index)}
            onClick={() => {dispatch(setPopUp(true)); dispatch(setProduct(product))}}
        ></i>
    ))

    return (
        <>
            <span
                onMouseLeave={() => setStarIndex(-1)}
            >
                {stars.map((star) => {
                    return star
                })}
            </span>
            <span>{avg !== "NaN" ? avg: product.rating}</span>
        </>
    )
}

const Title = () => (
    <div className={"rating-form-input-container"}>
        <h3>Title: </h3>
        <input
            type={"text"}
            id={"title"}
            name={"title"}
            required={true}
            className={"rating-title"}
        />
    </div>
)

const Description = () => (
    <div className={"rating-form-input-container"}>
        <h3>Description: </h3>
        <textarea
            id={"description"}
            name={"description"}
            required={true}
            className={"rating-description"}
        />
    </div>
)

const FormRating = ({ stars }) => (
    <div>
        <h3>Rating: </h3>
        {stars.map((star) => star)}
    </div>
)


function RatingForm({ productID }) {
    const dispatch = useDispatch()
    const [ starIndex, setStarIndex ] = useState(0)
    const [ clicked, setClicked ] = useState(false)
    const {authKey} = useAuth()

    const handleSubmit = (event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        fetch(`http://localhost:3000/reviews/${productID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Internship-Auth': authKey
            },
            body: JSON.stringify({
                title: data.get("title"),
                description: data.get("description"),
                rating: starIndex + 1
            })
        }).then(res => res.json()).then(data => {if (data.message) alert(data.message)})
    }

    const stars = Array.from({ length: 5 }).map((_, index) => (
        <i
            key={index}
            className={index <= starIndex ? "fa fa-star star": "fa fa-star-o star"}
            aria-hidden="true"
            onMouseEnter={() => { if (!clicked) setStarIndex(index)}}
            onMouseLeave={() => {if (!clicked) setStarIndex(-1)}}
            onClick={() => {setStarIndex(index); setClicked(true)}}
        ></i>
    ))

    return (
        <form className={"rating-form"} onSubmit={(e) => {handleSubmit(e); dispatch(setPopUp(false))}}>
            <button
                className={"rating-form-close-btn"}
                onClick={() => dispatch(setPopUp(false))}
            >
                <i className="fa fa-times" aria-hidden="true"></i>
            </button>
            <div className={"rating-form-container"}>
                <Title />
                <Description />
                <FormRating stars={stars}/>
                <input
                    type={"submit"}
                    value={"Submit"}
                    className={"rating-form-submit"}
                />
            </div>
        </form>
    )
}

export default function RatingPopUp() {
    const show = useSelector((state) => state.ratingPopUp)
    const product = useSelector((state) => state.product)

    if (show)
        return (
            <div className={"rating-pop-up"}>
                <RatingForm productID={product.id}/>
            </div>
        )
}