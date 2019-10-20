import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider'
import ProductList from './components/ProductList'
import CartHeader from './components/CartHeader'
import CartSessions from './components/CartSessions'
import Cupom from './components/Cupom'
import PurchaseButton from './components/PurchaseButton'

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const products = [
  { name: 'Apple', desc: 'sweet and delicious', price: 8, amount: 0},
  { name: 'Banana', desc: 'the best of the world', price: 4, amount: 0},
  { name: 'Orange', desc: 'orange orange',  price: 3, amount: 0}
]

const initialState = {
  products: products,
  shipping: 0,
  subtotal: 0,
  total: 0,
  kg: 0,
  cupoms: []
}

export default function Checkout() {
  const [ cart, setCart ] = useState(initialState)

  const classes = useStyles()

  const countAdd = ( productName ) => {
    const clone = [...cart.products].map( s => Object.assign({}, s));
    clone.forEach( c => {
      if(c.name === productName){
        c.amount += 1
      } 
      return c
    })
    setCart({...cart, products: clone})
  }

  const countSub = ( productName ) => {
    const clone = [...cart.products].map( s => Object.assign({}, s));
    clone.forEach( c => {
      if(c.name === productName && c.amount > 0){
        c.amount -= 1
      } 
      return c
    })
    setCart({...cart, products: clone})
  }


  const cartTotal = () => {

    const subtotal = cart.products.reduce((sum, product) => {
      return sum + (product.amount * product.price)
    }, 0)

    const kg = cart.products.reduce((sum, product) => {
      return sum + product.amount
    }, 0)

    let shipping = 0

    if(kg <= 10){
      shipping += 30
    }

    if(kg > 10){
      shipping = 30 + (Math.floor((kg/5) - 2) * 7)
    }

    if(kg > 400) {
      shipping = 0
    }
    
    setCart({...cart, subtotal: subtotal, total: subtotal + shipping, kg: kg, shipping: shipping})

  }
  
  useEffect( () => {
    cartTotal()
  }, [cart.products]) 

  return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <CartHeader />
          <ProductList  products={cart.products} countAdd={countAdd} countSub={countSub} />
          <Divider/>
          <CartSessions subtotal={cart.subtotal} total={cart.total} shipping={cart.shipping} />
          <Divider/> 
		  <Cupom />
          <Divider />
		  <PurchaseButton />
        </Paper>
      </main>
  );
}