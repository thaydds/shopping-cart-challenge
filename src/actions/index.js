// actions variables

export const CART_PRODUCT_AMOUNT_ADD = 'PRODUCT_AMOUNT_ADD'
export const CART_PRODUCT_AMOUNT_SUB = 'PRODUCT_AMOUNT_SUB'

export const CART_SUBTOTAL_CALC = 'CART_SUBTOTAL_CALC'
export const CART_TOTAL_CALC = 'CART_TOTAL_CALC'
export const CART_SHIPPING_CALC = 'CART_SHIPPING_CALC'

export const CART_CUPOM_ADD = 'CART_CUPOM_ADD'
export const CART_CUPOM_SUB = 'CART_CUPOM_SUB'


// actions functions

export const cartProductAmoundAdd = ( productName ) => {
    return { type: CART_PRODUCT_AMOUNT_ADD, productName}
}

export const cartProductAmoundSub = ( productName ) => {
    return { type: CART_PRODUCT_AMOUNT_SUB, productName}
}

export const cartSubtotalCalc = () => {return {type: CART_SUBTOTAL_CALC}}

export const cartShippingCalc = (products, cupom ) => {
    const kg = products.reduce((sum, product) => {
        return sum + product.amount
    }, 0)
    let shippingPrice = kg === 0 ?  0 : 30	
    if(kg > 10){
        shippingPrice += (Math.floor((kg/5) - 2) * 7)
    }
    if(cupom.length > 0 && cupom[0].type === 'Free Shipping'){
        shippingPrice = 0
    } 
    return { type: CART_SHIPPING_CALC, shippingPrice: shippingPrice }
}

export const cartTotalCalc = (subtotal, shipping, cupom) => {
    let discount = 0
    if(cupom.length > 0 && cupom[0].type === 'Fixed'){
        discount = cupom[0].effect
    } else if(cupom.length > 0 && cupom[0].type === 'Percentual'){
        discount = cupom[0].effect * subtotal
    }

    let total = (subtotal + shipping) - discount
    if(total < 0){
        total = 0
    }
    return {type: CART_TOTAL_CALC, total: total}
}



