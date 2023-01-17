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

    this.state = {
        product:{
            "id": 0,
            "name": "undefined",
            "price": 0,
            "type": ProductType.MAIN
        }
    }
  }

  render() {
    const product = this.props.product;
    return (
      <div className="foodCard">
        <img src={imgPlaceholder}></img>
        <div className="detail">
            <h1>{product.name}</h1><h3>{product.price}</h3><button onClick={()=>{this.props.onAdd(product)}}>Ajouter</button>
        </div>
      </div>
    );
  }

  componentDidMount() {

  }
}