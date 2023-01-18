import React from 'react';
import { Api } from '../services/Api';
import { commandStatus, Product, ProductType } from '../services/type';
import { ProductShopping } from './ShoppingList';

type CommandCardProps = {
    commands: Command
}

export type Command = {
    product: ProductShopping
    user:{
        login:string,
        firstname:string,
        lastname:string
    }
    date: string,
    status: commandStatus
}

export class CommandCard extends React.Component<CommandCardProps> {
  constructor(props:any) {
    super(props)

  }

  render() {
    return (
      <div className="commandCard">
        <div>COMMANDE {this.props.commands.user.firstname} {this.props.commands.user.lastname}</div>
        {this.props.commands.product.map((product)=>{
            return(
                <div>{product.quantity}X {product.name}</div>
            )
        })}
      </div>
    );
  }

  componentDidMount() {

  }
}