import { Component, OnInit } from '@angular/core'; 
import { AuthService } from '../../../shared/services/auth.service';
import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit  { 
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  //shoppingCartItemCount=0;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {  
    //console.log(auth.appUser$);
    //if(auth.isLogin==false) return;
    
    
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();

    // this.cart$.subscribe(cart => {
    //   this.shoppingCartItemCount = 0;
    //   for(let productId in cart.items){

    //     this.shoppingCartItemCount += cart.items[productId].quantity; 
    //     console.log(" cart.totalItemsCount:"+cart.totalItemsCount);
    //   }
      //console.log(" shoppingCartItemCount:"+shoppingCartItemCount); 
     
    //});

    // cart$.subscribe(cart => { 
    //   //this.shoppingCartItemCount = cart; 
      
    //   //return result? result[0] : null; // or undefined
    //   //console.log(" result:"+cart.items);
    //   //console.log(" result:"+cart.quantity);
    // });

    
  }

  logout(){
   this.auth.logout();
  }

}
