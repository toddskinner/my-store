import { Component, OnInit, Input } from '@angular/core';
import { OrderItem } from 'src/app/models/OrderItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() orderItem: OrderItem;
  orderInCartList: OrderItem[] = [];

  constructor(private cartService: CartService) { 
    this.orderItem = {
      id: 0,
      name: '',
      price: 0,
      quantity: 0
    }
  }

  ngOnInit(): void {
    this.orderInCartList = this.cartService.getCart();
  }

  emptyCart(): void {
    this.cartService.emptyCart();
    this.orderInCartList = [];
    alert("Cleared!");
  }
}
