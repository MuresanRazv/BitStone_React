import { useContext, useEffect, useMemo, useState } from 'react';
import './index.css'
import { ProductsContext } from './App';

function FiltersList({ dropFilters }) {
    const [categories, setCategories] = useState([])
    const [ filters, setFilters ] = useContext(ProductsContext).filter
    const [ pages, setPages ] = useContext(ProductsContext).pages
    
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
                    <div className="filter-row" key={category}>
                        <label htmlFor={category}>{capitalizeCategory(category)}</label>
                        <input
                        onChange={(e) => {
                            setPages(0)
                            e.target.checked 
                            ? setFilters([...filters, category])
                            : setFilters(filters.filter((value) => value !== category))
                        }}
                        className="filter-checkbox" type="checkbox" id={category} />
                    </div>
                )}
            </div>
        )
}

function FilterActionBar() {
    const [ dropFilters, setDropFilters ] = useState(false)
    const [ searchInput, setSearchInputs ] = useContext(ProductsContext).search
    const [ limit, setLimit ] = useContext(ProductsContext).limits

    return (
        <div className='filter-container'>
            <p>Products per page:</p>
            <select onChange={(e) => setLimit(e.target.value)} name='Products per page'>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
            </select>
            <section className="filter">
                <div className="filter-box" id="filter-category">
                    <form className="filter-box-form" id="filter-categories">
                        <input type="text" placeholder='search' 
                        //onMouseLeave={() => {if (dropFilters) return setDropFilters(!dropFilters)}}
                        onClick={() => setDropFilters(!dropFilters)} 
                        onChange={(e) => setSearchInputs(e.target.value)}/>
                        <FiltersList dropFilters={dropFilters}/>
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