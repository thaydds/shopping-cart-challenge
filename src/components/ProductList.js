import React from 'react'
import List from '@material-ui/core/List'
import PropTypes from 'prop-types'
import Product from './Product'


const ProductList = (props) => {
    const { products, countAdd, countSub } = props
    return(
        <List disablePadding>
            {products.map(product => 
               <Product countAdd={countAdd} countSub={countSub} key={product.name} product={product} />
            )}
          </List>
    )
}

export default ProductList

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    countAdd: PropTypes.func.isRequired,
    countSub: PropTypes.func.isRequired
  }