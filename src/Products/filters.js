import { useEffect, useState } from 'react';
import '../main/index.css'
import {useDispatch, useSelector} from "react-redux";
import {addFilters, removeFilter, setFilters} from "./Slices/filtersSlice";
import {setSearchInput} from "./Slices/searchSlice";
import {setPage} from "./Slices/pageSlice";
import {setLimit} from "./Slices/limitSlice";

function FiltersList({ dropFilters, setDropFilters }) {
    const [ categories, setCategories ] = useState([])
    const filters = useSelector((state) => state.filters)
    const dispatch = useDispatch();

    // because fetch returns 'ugly' categories
    function capitalizeCategory(category) {
        let words = category.split("-")
        let newWords = []

        for (let word of words)
            newWords.push(word.charAt(0).toUpperCase() + word.slice(1))

        return newWords.join(" ")
    }

    // because I need to fetch categories only once
    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then((data) => setCategories(data))
    }, [])

    if (dropFilters)
        return (
            <div className='filter-column'>
                {categories.map((category) => 
                    <div className="filter-row" key={category}
                    onMouseEnter={() => setDropFilters(true)}
                    onMouseLeave={() => setDropFilters(false)}>
                        <label htmlFor={category}>{capitalizeCategory(category)}</label>
                        <input
                        onChange={(e) => {
                            dispatch(setPage(0))
                            e.target.checked 
                            ? dispatch(addFilters(category))
                            : dispatch(removeFilter(category))
                        }}
                        checked={filters.includes(category)}
                        className="filter-checkbox" type="checkbox" id={category} />
                    </div>
                )}
            </div>
        )
}

function FilterActionBar() {
    const [ dropFilters, setDropFilters ] = useState(false)
    const dispatch = useDispatch();

    return (
        <div className='filter-container'>
            <p>Products per page:</p>
            <select onChange={(e) => { dispatch(setLimit(Number(e.target.value))); dispatch(setPage(0)) }} name='Products per page'>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
            </select>
            <section className="filter">
                <div className="filter-box" id="filter-category">
                    <form className="filter-box-form" id="filter-categories">
                        <input type="text" placeholder='search'
                        onMouseEnter={() => setDropFilters(true)}
                        onChange={(e) => dispatch(setSearchInput(e.target.value))}/>
                        <FiltersList setDropFilters={setDropFilters} dropFilters={dropFilters}/>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default function Filters() {
    return (
        <FilterActionBar/>
    )
}