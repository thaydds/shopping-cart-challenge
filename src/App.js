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
import { CART_SUBTOTAL_CALC, CART_TOTAL_CALC, CART_SHIPPING_CALC } from './actions'
import './App.css';
 
export default function App() {

	const cart = useSelector( state => state)
	const classes = useStyles()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({type: CART_SUBTOTAL_CALC})
	}, [cart.products, dispatch])

	useEffect(() => {
		const discount = cart.cupom.length > 0 && cart.cupom[0].type === 'Fixed' ? cart.cupom[0].effect : 0
		let total = (cart.subtotal + cart.shipping) - discount
		if(total < 0){
			total = 0
		}
		dispatch({type: CART_TOTAL_CALC, total: total})
	}, [cart.subtotal, cart.shipping, cart.cupom, dispatch])

	useEffect(() => {
		const kg = cart.products.reduce((sum, product) => {
			return sum + product.amount
		}, 0)
		let shippingPrice = kg === 0 ?  0 : 30	
		if(kg > 10){
			shippingPrice += (Math.floor((kg/5) - 2) * 7)
		}
		dispatch({ type: CART_SHIPPING_CALC, shippingPrice: shippingPrice})
	}, [cart.products, dispatch])

	return (
		<main className={classes.layout}>
			<Paper className={classes.paper}>
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