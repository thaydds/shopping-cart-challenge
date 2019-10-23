// actions variables

export const CART_PRODUCT_AMOUNT_ADD = 'PRODUCT_AMOUNT_ADD'
export const CART_PRODUCT_AMOUNT_SUB = 'PRODUCT_AMOUNT_SUB'

export const CART_SUBTOTAL_CALC = 'CART_SUBTOTAL_CALC'
export const CART_TOTAL_CALC = 'CART_TOTAL_CALC'
export const CART_SHIPPING_CALC = 'CART_SHIPPING_CALC'

export const CART_CUPOM_ADD = 'CART_CUPOM_ADD'
export const CART_CUPOM_SUB = 'CART_CUPOM_SUB'


// actions functions

export const cartProductAmoundAdd = (products, productName) => {
    // make a clone 
    const productClone = [...products.map( product => {
        return Object.assign({}, product )
    })]

    //find product and add amount
    const product = productClone.filter( product => product.name === productName)
    product.amount += 1

    return {
        type: CART_PRODUCT_AMOUNT_ADD,
        products: productClone
    } 
}

export const cartProductAmoundSub = (products, productName) => {
    
    const productClone = [...products.map( product => {
        return Object.assign({}, product )
    })]
    const product = productClone.filter( product => product.name === productName)
    product.amount -= 1

    return {
        type: CART_PRODUCT_AMOUNT_ADD,
        products: productClone
    } 
}

