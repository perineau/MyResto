import React from 'react';
import { Api } from '../services/Api';
import { Product, ProductType } from '../services/type';
import { FoodCard } from './FoodCard';

type SectionProps = {
    type: ProductType
    products: Product[]
    onAdd:(product:Product)=>void
}

export class Section extends React.Component<SectionProps> {
  constructor(props:any) {
    super(props)
  }

  render() {
    const products = this.props.products;
    let type = ""

    switch (this.props.type) {
        case ProductType.ENTRY:
            type = "Entrées"
            break;
        case ProductType.MAIN:
            type = "Plats"
            break;
        case ProductType.DESSERT:
            type = "Desserts"
            break;
        case ProductType.DRINK:
            type = "Boissons"
            break;
        default:
            break;
    }

    return (
      <div className="section">
        <h1>{type}</h1>
        {products.map((product,i)=>{
           return (
            <FoodCard product={product} onAdd={this.props.onAdd}></FoodCard>
           )
        })}
      </div>
    );
  }

  componentDidMount() {
  }
}