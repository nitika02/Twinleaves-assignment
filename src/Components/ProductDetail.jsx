import React from 'react'
import { Typography, Box, Table, TableBody, TableRow, TableCell, styled } from '@mui/material'

const ColumnText = styled(TableRow)`
    font-size: 14px;
    vertical-align: baseline;
    & > td {
        font-size: 14px;
        margin-top: 10px;
        border: none;
    }
`

const ProductDetail = ({product}) => {
    const date = new Date(new Date().getTime()+(5*24*60*60*1000))
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
  return (
    <div>
        <Typography variant="h3">{product.name}</Typography>
            <Typography style={{marginTop: 5, color: "#878787", fontSize: 14}}>8 Ratings & 1 Reviews
                <Box component="span"><img src={fassured} alt="" style={{width: 77, marginLeft: 20}}/></Box>
            </Typography>
            <Typography>
            <Box component="span" style={{fontSize: 28}}></Box>&nbsp;&nbsp;&nbsp;
            </Typography>
            <Table>
            <TableBody>
                <ColumnText>
                    <TableCell style={{color: "#878787"}}>Delivery</TableCell>
                    <TableCell style={{fontWeight: 600}}>Delivery by {date.toDateString()} | ₹40</TableCell>
                </ColumnText>
                <ColumnText>
                    <TableCell style={{color: "#878787"}}>Warranty</TableCell>
                    <TableCell>No Warranty</TableCell>
                </ColumnText>
                <ColumnText>
                    <TableCell style={{color: "#878787"}}>Seller</TableCell>
                    <TableCell>
                        <Box component="span"  style={{color: "#2874f0"}}>SuperComNet</Box>
                        <Typography>GST invoice availabe</Typography>
                        <Typography>View more sellers starting from </Typography>
                    </TableCell>
                </ColumnText>
                <ColumnText>
                    <TableCell colSpan={2}>
                        <img src={adURL} alt="" style={{width: 390}} />
                    </TableCell>
                </ColumnText>
                <ColumnText>
                    <TableCell style={{color: "#878787"}}>Description</TableCell>
                    <TableCell>{product.description}</TableCell>
                </ColumnText>
            </TableBody>
        </Table>
    </div>
  )
}

export default ProductDetail