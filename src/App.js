import React, {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider'
import ProductList from './components/ProductList'
import CartHeader from './components/CartHeader'
import CartSessions from './components/CartSessions'
import Cupom from './components/Cupom'
import PurchaseButton from './components/PurchaseButton'
import { useStyles } from './appStyle'
import { useSelector, useDispatch } from 'react-redux'
import { cartTotalCalc, cartSubtotalCalc, cartShippingCalc } from './actions'
import './App.css';
 
export default function App() {

	const cart = useSelector( state => state)
	const classes = useStyles()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(cartSubtotalCalc(cart.products, cart.cupom))
	}, [cart.products, cart.cupom, dispatch])

	useEffect(() => {
		dispatch(cartTotalCalc(cart.subtotal, cart.shipping, cart.cupom))
	}, [cart.subtotal, cart.shipping, cart.cupom, dispatch])

	useEffect(() => {
		dispatch(cartShippingCalc(cart.products, cart.cupom))
	}, [cart.products, dispatch, cart.cupom])

	return (
		<main className={classes.layout}>
			<Paper className={classes.paper}>
			<CartHeader />
			<ProductList  products={cart.products}/>
			<Divider/>
			<CartSessions subtotal={cart.subtotal} total={cart.total} shipping={cart.shipping} cupom={cart.cupom[0]} />
			<Divider/> 
			<Cupom />
			<Divider />
			<PurchaseButton />
			</Paper>
		</main>
	);
}