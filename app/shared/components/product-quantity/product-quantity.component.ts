import { Component, OnInit,Input } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent   {
  @Input('product') product:Product; 
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { 

  }

  addToCart(product:Product){
    //console.log("addToCart.product"+JSON.stringify(product));
    //let cart = this.cartService.getOrCreateCart();
    this.cartService.addToCart(product); 
  }

  subtractToCart(product:Product){
    //let cart = this.cartService.getOrCreateCart();
    this.cartService.subtractToCart(product); 
  }

  // get productQuantity(){
  //   if(!this.shoppingCart) return 0;  
  // }
 

}
