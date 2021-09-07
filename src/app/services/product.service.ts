import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private jsonURL = 'assets/data.json';
  products: Product[] = [];
  product: Product;
  
  constructor(private http: HttpClient) { 
    this.product = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: ''
    }
  }

  getProducts(): Observable<Product[]> {
    this.http.get<Product[]>(this.jsonURL).subscribe(res => {
      this.products = res;
    })

    return this.http.get<Product[]>(this.jsonURL);
  }

  getSpecificProduct(id: number): Product {
    for (let index = 0; index < this.products.length; index++) {
      if(this.products[index].id == id){
        this.product = this.products[index];
      }
    }
    return this.product;
  }
}
