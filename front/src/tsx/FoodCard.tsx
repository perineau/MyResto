import React from 'react';
import { Api } from '../services/Api';
import { Product, ProductType } from '../services/type';
import imgPlaceholder from "./../ressources/placeholder.svg"

type FoodCardProps = {
    product: Product,
    onAdd: (product:Product)=>void
}

export class FoodCard extends React.Component<FoodCardProps> {
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
    const product = this.props.product;
    const productImage = this._arrayBufferToBase64(this.props.product.image);
    return (
      <div className="foodCard">
        <img src={`data:image/png;base64,${productImage}`} ></img>
        <div className="detail">
            <h1>{product.name}</h1>
            <button onClick={()=>{this.props.onAdd(product)}}>Ajouter</button>
            <h3>{product.price} €</h3>
        </div>
      </div>
    );
  }

  componentDidMount() {

  }
}