import React, { useEffect, useState } from 'react'
import {DataGrid} from "@mui/x-data-grid"
import Loader from "../assets/loader.gif"
import Pagination from '../Components/Pagination';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';

const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [data, setData] = useState(products)
    const [filter, setFilter] = useState("")

    const navigate = useNavigate()
    

    const getProducts = async () => {
        const res = await fetch(`https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products?page=${page}`)
        const data = await res.json();
        setProducts(data.products)
        setTotal(data.totalPages)
        setLoading(false)
    }

    useEffect(() => {
        getProducts()
    }, [page])

    // const filteredData = filter
    // ? products.filter(item => filter === '' || item.main_category === filter)
    // : data;
    const filteredData = filter
        ? products.filter(item => item.main_category === filter)
        : products;
        // console.log('filter:', filter);
        // console.log('filteredData:', filteredData);

    const columns = [
        {field: "id", headerName: "ID", width: 90},
        {field: "photoURL", headerName: "Image", width: 150, renderCell: (params) => {
            return <img src={params.value} alt="" style={{width: 50, height: 50}} />;
        }},
        {field: "name", headerName: "Product", width: 350},
        {field: "mrp", headerName: "Price", width: 150},
        {field: "description", headerName: "Description", width: 250}
    ]

    const rows = filteredData.map((row, index) => ({
        id: index+1,
        photoURL: `${row.images.front !== null ? row.images.front : row.gs1_images.front}`,
        name: `${row.name} ${row.company_detail.name}`,
        mrp: `Rs. ${row.mrp.mrp}`,
        description: row.description
    }))
    
    const sortLtoH = () => {
        const sorted = [...filteredData].sort((a, b) => a.mrp.mrp - b.mrp.mrp)
        console.log(products.map((row) => console.log(typeof row.mrp.mrp)))
        setProducts(sorted)
    }
    const sortHtoL = () => {
        const sortedl = [...filteredData].sort((a, b) => b.mrp.mrp - a.mrp.mrp)
        setProducts(sortedl)
    }

    const handleRowClick = (params) => {
        console.log(params.row)
        navigate(`${params.row.name}`)
        localStorage.setItem("SingleProduct", JSON.stringify(params.row))
      };

      const handlePage = () => {
        if(page && currentPage > 500) {
            setCurrentPage(1)
            setPage(1)
        }
        setLoading(true)
        setCurrentPage(page+1)
        setPage(page+1)
      }
      const handlePagePrev = () => {
        if(page && currentPage < 1) {
            setCurrentPage(1)
            setPage(1)
        }
        setLoading(true)
        setCurrentPage(page-1)
        setPage(page-1)
      }
      const handleCategoryChange = event => {
        setFilter(event.target.value);
      };
     

  return (
    <div style={{height: "90vh", width: "80%", marginLeft: "50px"}}>
        <div className='sort'>
            <p onClick={() => setProducts(products)}>Sort By</p>
            <p onClick={sortLtoH}>Price -- Low to High</p>
            <p onClick={sortHtoL}>Price -- High to Low</p>
        </div>
        <div style={{marginBottom: "30px"}}>
            <label htmlFor="category">Filter by Category</label>
            <select name="category" id="category" onChange={handleCategoryChange} value={filter}>
                <option value="">All</option>
                <option value="Bakery, Cakes & Dairy">Bakery, Cakes & Dairy</option>
                <option value="Foodgrains, Oil & Masala">Foodgrains, Oil & Masala</option>
                <option value="Snacks & Branded Foods">Snacks & Branded Foods</option>
                <option value="Beauty & Hygiene">Beauty & Hygiene</option>
                <option value="Cleaning & Household">Cleaning & Household</option>
                <option value="Beverages">Beverages</option>

            </select>
        </div>
        {
            loading ? <img src={Loader} alt="" /> : <>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    onRowClick={handleRowClick}
                    
                />
                <Pagination total={total} currentPage={currentPage} handlePage={handlePage} handlePagePrev={handlePagePrev} />
            </>
        }
       
    </div>
  )
}

export default Homepage