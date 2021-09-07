import { Component, OnInit, Input } from '@angular/core';
import { OrderItem } from 'src/app/models/OrderItem';
import { CartService } from 'src/app/services/cart.service';
import { Customer } from 'src/app/models/Customer';
import {formatNumber} from '@angular/common';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  @Input() orderItem: OrderItem;
  orderItems: OrderItem[] = [];
  confirmedCustomer: Customer = new Customer();
  fullname: string = '';
  address: string = '';
  creditcard: string = '';
  total: string = '';
  

  constructor(private cartService: CartService) { 
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
    this.getCartTotal();
    this.confirmedCustomer = this.cartService.getCustomerInfo();
    this.cartService.clearCustomerInfo();
    this.cartService.emptyCart();
  }

  getCustomerName(): string {
    return this.confirmedCustomer.fullname;
  }

  getCustomerAddress(): string {
    return this.confirmedCustomer.address;
  }

  getCustomerCard(): string {
    return this.confirmedCustomer.creditcard.slice(12);
  }

  getCartTotal(): string{
    this.total = formatNumber(Number(this.cartService.getTotal()), 'en-US', '1.0-2');
    return this.total;
  }
}
