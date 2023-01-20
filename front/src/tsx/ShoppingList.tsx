import React from 'react';
import { Api } from '../services/Api';
import { Product } from '../services/type';
import imgPlaceholder from "./../ressources/placeholder.svg"
import { user } from './App';
import "./../css/ShoppingList.css"
import { useState } from 'react';

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

  _arrayBufferToBase64 = ( buffer: any ) => {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

  render() {
    const shoppingList = this.props.products;
    var total = 0

    shoppingList.forEach((product)=>{
      total += product.price * product.quantity
    })

    return (
      <div className="shopping-list hide">
        <h1>Récapitulatif</h1>
        {
          shoppingList.map((value,i)=>{
            const productImage = this._arrayBufferToBase64(value.image);
            return(
              <div className='shoppingListCard'>
                <img src={`data:image/png;base64,${productImage}`}></img>
                <div className='verticalFlex'>
                  <span> {value.name} </span>
    
                  <span> {(value.price * value.quantity).toFixed(2)}€ </span>

                  <div>
                    {/*<button onClick={()=>{this.props.onDelete(value)}}>Poubelle</button>*/}
                    <button onClick={()=>{this.props.onRemove(value)}}>-</button>
                    <span> {value.quantity} </span>
                    <button onClick={()=>{this.props.onAdd(value)}}>+</button>
                  </div>

                </div>
            </div>
            )
          })
        }
        <div>total: {total.toFixed(2)}€</div>
        <button onClick={()=>{
          if(user.login && user.password){
            Api.createCommand(this.props.products)
            this.props.products.map((product) => {
              this.props.onDelete(product)
            })
          }else{
            alert("Vous devez vous connecter avant de pouvoir commander.")
          }
        }}>Valider mon panier</button>
      </div>
    );
  }
}