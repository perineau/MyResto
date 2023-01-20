import React from 'react';
import { Api } from '../services/Api';
import { commandStatus, Product, ProductType } from '../services/type';
import { ProductShopping } from './ShoppingList';

type CommandCardProps = {
    commands: Command,
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


  setCommandDone(command: Command) {
    Api.setCommandDone(command);
    Api.getCommand();
    window.location.reload();
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
              {this.props.commands.status === "PREPARE" ? 
                <button onClick={()=> this.setCommandDone(this.props.commands)}>Done</button>
                : null
              }
              <hr/>
              <br/>
              </>
            )
          })}
          </>
    );
  }

}