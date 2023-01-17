import React from 'react';
import { Api } from '../services/Api';
import { Product } from '../services/type';

export type ProductShopping = {
  [name:string]:{
    product:Product,
    qte: number
  }
}

type ShoppingListProps = {
  products: ProductShopping;
  onAdd:(product:Product)=>void
  onRemove:(product:Product)=>void
}

type ShoppingListState = {
}

export class ShoppingList extends React.Component<ShoppingListProps, ShoppingListState> {
  constructor(props:any) {
    super(props)
  }

  render() {
    const shoppingList = this.props.products;

    return (
      <div className="shopping-list">
        <h1>Récapitulatif</h1>
        {
          Object.keys(shoppingList).map(key => {
            return(
              <div>
                <span>{shoppingList[key].product.name}</span>
                <span>{(shoppingList[key].product.price * shoppingList[key].qte).toFixed(2)}€</span>
                <button onClick={()=>{this.props.onAdd(shoppingList[key].product)}}>+</button>
                <span>{shoppingList[key].qte}</span>
                <button onClick={()=>{this.props.onRemove(shoppingList[key].product)}}>-</button>
              </div>
            )
          })
        }
      </div>
    );
  }
}