import React from 'react';
import { Api } from '../services/Api';
import { Product, ProductType } from '../services/type';
import { ProductShopping } from './ShoppingList';

type CommandCardProps = {
    commands: Command
}

type Command = {
    product: ProductShopping
    user:{
        login:string,
        firstname:string,
        lastname:string
    }
}

export class CommandCard extends React.Component<CommandCardProps> {
  constructor(props:any) {
    super(props)
  }

  render() {
    return (
      <div className="commandCard">
        COMMANDE {this.props.commands.user.firstname} {this.props.commands.user.lastname}
        {this.props.commands.product.map((product)=>{
            return(
                <span>{product.quantity}X {product.name}</span>
            )
        })}
      </div>
    );
  }

  componentDidMount() {

  }
}