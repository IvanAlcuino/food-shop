import { Component, OnInit,Input } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product:Product;
  @Input('show-actions') showActions:boolean;
  @Input('shopping-cart') shoppingCart: ShoppingCart = null;

  constructor(private cartService: ShoppingCartService) { 

  }

  addToCart(product:Product){
    //let cart = this.cartService.getOrCreateCart();
    this.cartService.addToCart(product); 
  }

  // subtractToCart(product:Product){
  //   //let cart = this.cartService.getOrCreateCart();
  //   this.cartService.subtractToCart(product); 
  // }

  // getProductQuantity(productId){
  //   if(!this.shoppingCart) return 0;

  //   //let product = this.shoppingCart.

  // }


  // getQuantity(){
  //   if(!this.shoppingCart) return 0;
  //   //console.log()
  //   let item = this.shoppingCart.items[this.product.key];
  //   return item ? item.quantity : 0;
  // }

  

}
