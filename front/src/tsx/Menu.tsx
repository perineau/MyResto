import React from 'react';
import { Api } from '../services/Api';
import { Product, ProductType } from '../services/type';
import { FoodCard } from './FoodCard';
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
        productsShopping: {}
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

        <ShoppingList products={this.state.productsShopping} onAdd={this.addProductToShoppingList.bind(this)} onRemove={this.removeProductToShoppingList.bind(this)}></ShoppingList>
      </div>
    );
  }

  addProductToShoppingList(product:Product){
    var productsShopping = this.state.productsShopping
    if(productsShopping[product.id]){
      productsShopping[product.id].qte++
    }else{
      productsShopping[product.id] = {
        product:product,
        qte:1
      }
    }

    this.setState({
      products: this.state.products,
      productsShopping: productsShopping
    })
  }

  removeProductToShoppingList(product:Product){
    var productsShopping = this.state.productsShopping
    if(productsShopping[product.id]){
      productsShopping[product.id].qte--

      if(productsShopping[product.id].qte == 0){
        delete productsShopping[product.id]
      }
    }

    this.setState({
      products: this.state.products,
      productsShopping: productsShopping
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