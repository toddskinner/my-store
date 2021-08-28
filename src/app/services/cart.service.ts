import { Injectable } from '@angular/core';
import { OrderItem } from '../models/OrderItem';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  orderInCartList: OrderItem[] = [];
  orderItem: OrderItem = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0
  }

  constructor() { }

  addToCart(product: Product){
    this.orderItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 0      // NEED TO FIGURE OUT HOW TO GET THIS VALUE
    };
    this.orderInCartList.push(this.orderItem);
    return this.orderInCartList;
  }

  getCart(){
    return this.orderInCartList;
  }

  emptyCart(){
    this.orderInCartList = [];
    return this.orderInCartList;
  }
}
