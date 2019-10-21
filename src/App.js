import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider'
import ProductList from './components/ProductList'
import CartHeader from './components/CartHeader'
import CartSessions from './components/CartSessions'
import Cupom from './components/Cupom'
import PurchaseButton from './components/PurchaseButton'
import { useStyles } from './appStyle'
import { useSelector } from 'react-redux'
 
export default function App() {

  const cart = useSelector( state => state)
  const classes = useStyles()

  return (
      <main className={classes.layout}>
        <Paper className={classes.paper}s>
          <CartHeader />
          <ProductList  products={cart.products}/>
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