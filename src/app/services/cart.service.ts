import { Injectable } from '@angular/core';
import { OrderItem } from '../models/OrderItem';
import { Product } from '../models/Product';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: OrderItem[] = [];
  customer: Customer = new Customer();
  
  constructor() { }

  addToCart(product: Product, quantity: number): OrderItem[]{
    let itemPrevAdded = false;
    let orderItem: OrderItem = new OrderItem();
    orderItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      url: product.url,
      quantity: quantity,
      subtotal: (product.price * quantity)      
    };

    for (let index = 0; index < this.cartItems.length; index++) {
      if(this.cartItems[index].id == orderItem.id){
        itemPrevAdded = true;
        this.cartItems[index].quantity = this.cartItems[index].quantity + orderItem.quantity;
        this.cartItems[index].subtotal = this.cartItems[index].subtotal + (orderItem.quantity * orderItem.price);
        this.alertAddedItem(orderItem);
      }
    }

    if(!itemPrevAdded){
      this.cartItems.push(orderItem);
      this.alertAddedItem(orderItem);
    }

    return this.cartItems;
  }

  getCart(): OrderItem[]{
    return this.cartItems;
  }

  emptyCart(): OrderItem[]{
    this.cartItems = [];
    return this.cartItems;
  }

  getTotal(): number{
    return this.cartItems.map(tag => tag.subtotal).reduce((a, b) => a + b, 0);
  }

  addCustomerInfo(fullname: string, address: string, creditcard: string): Customer{
    this.customer = {
      fullname: fullname,
      address: address,
      creditcard: creditcard
    };
    return this.customer;
  }

  getCustomerInfo(): Customer {
    return this.customer;
  }

  clearCustomerInfo(): Customer {
    this.customer = {
      fullname: '',
      address: '',
      creditcard: ''
    };
    return this.customer;
  }

  updateCart(item: OrderItem){
    for(let i =0 ; i< this.cartItems.length ; i++){
      if(this.cartItems[i].id === item.id){
        this.updateCartItem(i,item);
      }
    }
    this.getTotal();
  }

  updateCartItem(index: number , item : OrderItem){
    this.cartItems[index].quantity = item.quantity;
    this.cartItems[index].subtotal = item.price * item.quantity;
  }

  removeItem(item : OrderItem):void{
    for(let i =0 ; i< this.cartItems.length ; i++){
      if(this.cartItems[i].id === item.id){
        this.cartItems.splice(i,1);
        break;
      }
    }
    this.getTotal();

    if((item.quantity > 1) && (item.name === 'Book' || 
    item.name === 'Backpack' || item.name === 'Cup' || item.name === 'Shirt')){
        alert(item.quantity + ' ' + item.name + "s removed from your cart!");
    } else {
        alert(item.quantity + ' ' +item.name + " removed from your cart!");
    }
  }

  alertAddedItem(orderItem: OrderItem){
    if((orderItem.quantity > 1) && (orderItem.name === 'Book' || 
      orderItem.name === 'Backpack' || orderItem.name === 'Cup' || orderItem.name === 'Shirt')){
        alert(orderItem.quantity + ' ' + orderItem.name + "s added to your cart!");
    } else {
        alert(orderItem.quantity + ' ' + orderItem.name + " added to your cart!");
    }
  }
}
