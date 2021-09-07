import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  productId: number = 0;
  product: Product = new Product();
  products: Product[] = [];
  id: number = 0;
  selected = 0;

  constructor(private route: ActivatedRoute, 
    private productService: ProductService,
    private cartService: CartService) { 
    this.product = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: ''
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getProductDetail(this.id);
  }

  getProductDetail(id: number): void{
    this.product = this.productService.getSpecificProduct(id);
  }

  addToCart(product: Product, quantity: number): void {
    this.cartService.addToCart(product, quantity);
  }
}
