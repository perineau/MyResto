import React from 'react';
import { Api } from '../services/Api';
import { commandStatus, Product, ProductType } from '../services/type';
import { ProductShopping } from './ShoppingList';

type CommandCardProps = {
    commands: Command
}

export type Command = {
    id: number
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
      <>
      <div><strong>COMMANDE n°{this.props.commands.id} {this.props.commands.user.firstname} {this.props.commands.user.lastname}</strong></div>
      {this.props.commands.product.map((product)=>{
        return(
        <>
              <br/>
              <div>{product.quantity}x {product.name}</div>
              <br/>
              <hr/>
              <br/>
              </>
            )
          })}
          </>
    );
  }

  componentDidMount() {

  }
}