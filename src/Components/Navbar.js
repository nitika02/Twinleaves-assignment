import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { InputBase, styled, List, ListItem, ListItemText, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

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

  const getProducts = async () => {
    const res = await fetch(`https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products}`)
    const data = await res.json();
    setProducts(data.products)
}

useEffect(() => {
    getProducts()
}, [])

  const getText = (text) => {
    setText(text)
    console.log(text)
}
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
            <Link to="/"><Typography variant="h3">Grocery Store</Typography></Link>
            <SearchContainer>
                <InputSearchBase 
                placeholder='Search for products, Brands and more'
                onChange={(e) => getText(e.target.value)}
                value={text}
            />
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                {
            text && 
                <ListWrapper>
                    {
                        products.filter(product => product.name.toLowerCase().includes(text.toLowerCase())).map(product => (
                            <ListItem>
                                <Link to={`/${product}`}
                                onClick={() => setText("")}
                                style={{textDecoration: "none", color: "inherit"}}
                                >
                                    {product.name}
                                </Link>
                            </ListItem>
                        ))
                        
                    }
                </ListWrapper>
        }
            </SearchContainer>
          </Container> 
        </Box>
    </div>
  )
}

export default Navbar