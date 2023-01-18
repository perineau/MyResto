import React from 'react';
import { Api } from '../services/Api';
import { Product } from '../services/type';
import imgPlaceholder from "./../ressources/placeholder.svg"

export type ProductShopping = (Product&{quantity:number})[]

type ShoppingListProps = {
  products: ProductShopping;
  onAdd:(product:Product)=>void
  onRemove:(product:Product)=>void
  onDelete:(product:Product)=>void
}

type ShoppingListState = {
}

export class ShoppingList extends React.Component<ShoppingListProps, ShoppingListState> {
  constructor(props:any) {
    super(props)
  }

  render() {
    const shoppingList = this.props.products;
    var total = 0
    shoppingList.forEach((product)=>{
      total += product.price * product.quantity
    })

    return (
      <div className="shopping-list">
        <h1>Récapitulatif</h1>
        {
          shoppingList.map((value,i)=>{
            return(
              <div key={i}>
                <img src={imgPlaceholder}></img>
                <span>{value.name}</span>
                <span>{(value.price * value.quantity).toFixed(2)}€</span>
                <button onClick={()=>{this.props.onDelete(value)}}>Poubelle</button>
                <button onClick={()=>{this.props.onAdd(value)}}>+</button>
                <span>{value.quantity}</span>
                <button onClick={()=>{this.props.onRemove(value)}}>-</button>
            </div>
            )
          })
        }
        <div>total: {total.toFixed(2)}€</div>
        <button onClick={()=>{Api.createCommand(this.props.products)}}>Valider mon panier</button>
      </div>
    );
  }
}