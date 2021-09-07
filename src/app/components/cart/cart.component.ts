import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItem } from 'src/app/models/OrderItem';
import { CartService } from 'src/app/services/cart.service';
import {formatNumber} from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() orderItem: OrderItem;
  orderItems: OrderItem[] = [];
  fullname: string = '';
  address: string = '';
  creditcard: string = '';

  constructor(private cartService: CartService, private router: Router) { 
    this.orderItem = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      quantity: 0,
      subtotal: 0
    }
  }

  ngOnInit(): void {
    this.orderItems = this.cartService.getCart();
  }

  emptyCart(): void {
    this.cartService.emptyCart();
    this.orderItems = [];
  }

  getCartTotal(): string{
    return formatNumber(Number(this.cartService.getTotal()), 'en-US', '1.0-2');
  }

  submitForm(){
    this.cartService.addCustomerInfo(this.fullname, this.address, this.creditcard);
    this.router.navigate(['/confirmation']);
  }

  removeItem(orderItem: OrderItem):void{
    this.cartService.removeItem(orderItem);
  }
}
