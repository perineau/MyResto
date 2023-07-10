import React from 'react';
import { Api } from '../services/Api';
import { Product, ProductType } from '../services/type';
import { Section } from './Section';
import { ProductShopping, ShoppingList } from './ShoppingList';

type MenuProps = {
}

type MenuState = {
    products: Product[]
    productsShopping: ProductShopping
};

export class Menu extends React.Component<MenuProps,MenuState> {
  constructor(props:any) {
    super(props)

    this.state = {
      products:[],
      productsShopping: []
    }
  }

  render() {
    var _this = this;
    var products = this.state.products
    
    return (
      <div className="products">
        <Section type={ProductType.ENTRY} products={products.filter((v) => { return v.type == ProductType.ENTRY; })} onAdd={this.addProductToShoppingList.bind(this)}></Section>
        <Section type={ProductType.MAIN} products={products.filter((v) => { return v.type == ProductType.MAIN; })} onAdd={this.addProductToShoppingList.bind(this)}></Section>
        <Section type={ProductType.DESSERT} products={products.filter((v) => { return v.type == ProductType.DESSERT; })} onAdd={this.addProductToShoppingList.bind(this)}></Section>
        <Section type={ProductType.DRINK} products={products.filter((v) => { return v.type == ProductType.DRINK; })} onAdd={this.addProductToShoppingList.bind(this)}></Section>

        <ShoppingList products={this.state.productsShopping} onDelete={this.deleteProductToShoppingList.bind(this)} onAdd={this.addProductToShoppingList.bind(this)} onRemove={this.removeProductToShoppingList.bind(this)}></ShoppingList>
        <div id='onBackground'></div>
      </div>
    );
  }

  addProductToShoppingList(product:Product){
    var productsShopping = this.state.productsShopping
    var productIndex = productsShopping.findIndex((_product)=>product.id == _product?.id)

    if(productIndex != -1){
      productsShopping[productIndex].quantity++
    }else{
      productsShopping.push({
        id: product.id,
        name: product.name,
        price: product.price,
        type: product.type,
        quantity:1,
        image: product.image
      })
    }

    this.setState({
      products: this.state.products,
      productsShopping: productsShopping
    })
  }

  removeProductToShoppingList(product:Product){
    var productsShopping = this.state.productsShopping
    var productIndex = productsShopping.findIndex((_product)=>product.id == _product?.id)

    if(productIndex != -1){
      productsShopping[productIndex].quantity--
      if(productsShopping[productIndex].quantity <= 0) delete productsShopping[productIndex]
    }else{
      throw new Error("Ce produit n'existe pas")
    }

    this.setState({
      products: this.state.products,
      productsShopping: productsShopping
    })
  }

  deleteProductToShoppingList(product:Product){
    var productsShopping = this.state.productsShopping
    var productIndex = productsShopping.findIndex((_product)=>product.id == _product?.id)

    if(productIndex != -1){
      delete productsShopping[productIndex]
    }else{
      throw new Error("Ce produit n'existe pas")
    }

    this.setState({
      products: this.state.products,
      productsShopping: []
    })
  }

  componentDidMount() {
    this.getMenu();
  }

  async getMenu() {
    const products = await Api.getMenu();
    this.setState({ products: products });
  }
}