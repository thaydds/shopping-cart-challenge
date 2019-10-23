import React from 'react'
import List from '@material-ui/core/List'
import PropTypes from 'prop-types'
import Product from './Product'


const ProductList = (props) => {
    const { products } = props
    return(
        <List data-testid='product-list' disablePadding>
            {products.map(product => 
               <Product key={product.name} product={product} />
            )}
          </List>
    )
}

export default ProductList

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
  }