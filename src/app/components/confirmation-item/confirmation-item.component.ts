import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderItem } from 'src/app/models/OrderItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirmation-item',
  templateUrl: './confirmation-item.component.html',
  styleUrls: ['./confirmation-item.component.css']
})
export class ConfirmationItemComponent implements OnInit {
  @Input() orderItem: OrderItem;

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

}
