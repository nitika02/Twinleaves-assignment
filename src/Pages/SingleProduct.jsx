import { Typography } from '@mui/material'
import React from 'react'
import {Box, Grid, styled} from "@mui/material"
import ActionItem from '../Components/ActionItem'
import ProductDetail from '../Components/ProductDetail'

const Component = styled(Box)`
  background: #f2f2f2;
  margin-top: 55px;
`
const Container = styled(Grid)(({theme}) => ({
    backgroundColor: "#ffffff",
    display: "flex",
    [theme.breakpoints.down("md")] : {
      margin: 0
    }
}))
    

const RightContainer = styled(Grid)`
  margin-top: 55px;
  padding-left: 20px;
  & > p {
    margin-top: 10px;
  }
`

const SingleProduct = () => {
  const product = JSON.parse(localStorage.getItem("Single"))
  console.log(product)
  return (
    <Component>
        {
          product && Object.keys(product).length &&
              <Container container>
                  <Grid item lg={4} md={4} sm={8} xs={12}>
                      <ActionItem product={product} />
                  </Grid>
                  <RightContainer item lg={8} md={8} sm={8} xs={12}>
                    <ProductDetail product={product}/>
                  </RightContainer>
              </Container>
        }
      </Component>
  )
}

export default SingleProduct