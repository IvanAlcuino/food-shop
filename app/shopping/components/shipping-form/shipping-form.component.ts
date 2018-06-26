import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../shared/models/order';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy  {
  @Input('cart') cart: ShoppingCart;
  shipping = {
    key: '',
    name: '', 
    quantity: '',
    imageUrl: '',
    addressLine1: '',
    addressLine2: '',
    city: '',

  };  
  userId: string; 
  userSubscription: Subscription;
  
  constructor(private authService: AuthService, private router: Router, private orderService: OrderService){
    
  }  
  
  ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    console.log(this.shipping);

    let order = new Order(this.userId, this.shipping, this.cart);
    let result:any = await this.orderService.placeOrder(order);
    
    this.router.navigate(['/order-success/', result.key]);

    // let order = {
    //   userId: this.userId,
    //   datePlaced: new Date().getTime(),
    //   shipping: this.shipping,
    //   items: this.cart.items.map(i => {
    //     return {
    //       product: {
    //         title: i.title,
    //         imageUrl: i.imageUrl,
    //         price: i.price
    //       },
    //       quatity: i.quantity,
    //       totalPrice: i.totalPrice
    //     }
    //   })
    //};
    //this.orderService.storeOrder(order);

  }   

}
