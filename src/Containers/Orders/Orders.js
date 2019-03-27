import React from 'react'
import classes from './Orders.scss'
import { useEffect } from 'react'

import { connect } from 'react-redux'
import * as toOrder from '../../redux/actions/ordersAction'

import Order from '../../Components/Order/Order'
import FetchError from '../../Components/UI/FetchError/FetchError'
import OrderLoader from '../../Components/UI/Loaders/OrderLoader/OrderLoader'
import EmptyContainer from '../../Components/UI/EmptyContainer/EmptyContainer'



const Orders = props => {    

    useEffect(() => {
        props.onLoadedOrders()
        return () => {
            props.onClear()
        }
    }, [])

    const readyOrders = props.orders.map(order => {
        return (
            <Order 
                date={order.date} 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
             />
        )
    })

    return (
        <div className={classes.Orders}>
            { props.loading ? <OrderLoader /> : null }
            { props.error ? <FetchError retryFunc={props.onLoadedOrders}>{props.error.message}</FetchError> : null }
            {props.orders.length === 0 && props.error === null && !props.loading ? <EmptyContainer /> : readyOrders }
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        error: state.orders.error
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        onLoadedOrders: () => dispatch(toOrder.fetchOrders()),
        onClear: () => dispatch(toOrder.clearOrders())
    }
}


export default connect(mapStateToProps, mapDispathToProps)(Orders)