import React, { useEffect, useState } from 'react'
import "./style.scss";
import Filter from './filter/Filter';
import Products from './products/Products';
import LoadingSkelton from '../../loading/LoadingSkelton';
import { useVaue } from '../../context/productContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const { loading } = useVaue();
    const { setProducts, originalProducts } = useVaue();

    const [search, setSearch] = useState('');

    useEffect(() => {
        setProducts(originalProducts.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())));
    }, [search])

    return (
        <>
            {loading ? (
                <LoadingSkelton />
            ) : (
                <div className='home-container'>

                    <div className='input'>
                        <input type="text" placeholder='Search By Name' value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="filter-product-container">
                        <div className="filter-container">
                            <Filter />
                        </div>
                        <Products />
                    </div>

                </div>
            )}
        </>
    )
}

export default Home