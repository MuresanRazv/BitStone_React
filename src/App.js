import './App.css';
import './index.css'
import Products from './products'
import Filters from './filters';
import Header from './header'
import { useState } from 'react';
import React from 'react';

export const ProductsContext = React.createContext()

function App() {
  const [filters, setFilters] = useState([])
  const [products, setProducts] = useState([])
  const [searchInput, setSearchInputs] = useState("")
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(5)

  return (
      // main section
      <main>
          <Header />
          <ProductsContext.Provider 
            value={{filter: [filters, setFilters],
                    product: [products, setProducts],
                    search: [searchInput, setSearchInputs],
                    pages: [page, setPage],
                    limits: [limit, setLimit]}}>
            <Filters />
            <Products />
          </ProductsContext.Provider>
      </main>
  );
}

export default App;
