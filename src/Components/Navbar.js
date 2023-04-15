import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { InputBase, styled, List, ListItem, ListItemText, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';

const SearchContainer = styled(Box)`
    background: #fff;
    width: 38%;
    border-rdius: 2px;
    margin-left: 10px;
    display: flex;
`
const Container = styled(Box)(({theme}) => ({
  display: "flex",
  justifyContent: "space-around",
  height: "50px",
  [theme.breakpoints.down("sm")] : {
    flexDirection: "column"
  }
}))
  


const InputSearchBase = styled(InputBase)`
    padding-left: 20px;
    width: 100%;
    font-size: unset;


`
const SearchIconWrapper = styled(Box)`
    color: blue;
    padding: 5px;
    display: flex;
`
const ListWrapper = styled(List)`
    position: absolute;
    background: #ffffff;
    color: #000;
    margin-top: 36px;
`

const Navbar = () => {
  const [text, setText] = useState()
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProducts = async () => {
    const res = await fetch(`https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products`)
    const data = await res.json();
    setProducts(data.products)
}

useEffect(() => {
    getProducts()
}, [text])

const handleTextChange = (text) => {
  setText(text);
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(text.toLowerCase())
  );
  setFilteredProducts(filtered);
};
const navigate = useNavigate()
  return (
    <div>
        <Box
            sx={{
                width: "100%",
                height: 70,
                backgroundColor: 'primary.dark',
                '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
          <Container>
            <Link to="/"><Typography variant="h3" color="white">Grocery Store</Typography></Link>
            <SearchContainer>
                <InputSearchBase 
                placeholder='Search for products, Brands and more'
                onChange={(e) => handleTextChange(e.target.value)}
                value={text}
            />
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                {
            text && 
                <ListWrapper>
                    {filteredProducts.map((product) => ([
                      <ListItem
            
                          onClick={() => {
                            console.log(typeof product)
                            navigate(`${product.name} ${product.company_detail.name}`)
                            setText("")
                            localStorage.setItem("SingleProduct", JSON.stringify(product))
                          }}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {product.name}
                          {/* <div>{product.someInnerObject.mrp}</div> */}
                       
                      </ListItem>
                    ]))}
                </ListWrapper>
        }
            </SearchContainer>
          </Container> 
        </Box>
    </div>
  )
}

export default Navbar