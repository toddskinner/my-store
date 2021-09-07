import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderItem } from 'src/app/models/OrderItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() orderItem: OrderItem;
  @Output() removedItem : EventEmitter<OrderItem> = new EventEmitter;

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
  }

  changeQuantity(quantity : number) : void{
    this.orderItem.quantity = quantity;
    this.orderItem.subtotal = this.orderItem.price * quantity;
    this.cartService.updateCart(this.orderItem);
    
  }

  removeItem(orderItem:OrderItem):void{
    this.removedItem.emit(orderItem);
  }
}
