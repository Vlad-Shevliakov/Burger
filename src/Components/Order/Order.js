import React from 'react'
import classes from './Order.scss'

const Order = props => {
    const ingredients = []

    for (const ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientsOutput = ingredients.map(ingred => {
        if (ingred.amount > 0) {
            return <span key={ingred.name} className={classes.IngredientItem}>{ingred.name}: {ingred.amount}</span>
        } else {
            return null
        }
    })

    return (
        <div className={classes.Order}>
            <p className={classes.IngredName}>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>3$</strong></p>
            <p>Date: <strong>{props.date}</strong></p>
        </div>
    )
}

export default Order