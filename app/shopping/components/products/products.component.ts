import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { CategoryService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Product } from '../../../shared/models/product';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit { 
  products:Product[] = [];
  filteredProducts = [];
  category: string;
  subscription: Subscription;  
  subscription2: Subscription;
  cart$: Observable<ShoppingCart>;
  //cart: ShoppingCart = null;

  constructor(private route: ActivatedRoute, private productService: ProductService, private shoppingCartService: ShoppingCartService) {
 
    
    
    
   }

  async ngOnInit() { 
    //this.subscription2 = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);
    //this.subscription2 = (await this.shoppingCartService.getCart()).subscribe(cart => {this.cart = cart; console.log("CART: "+this.cart);});
    //this.cart = this.shoppingCartService.getCart();
    this.cart$ = await this.shoppingCartService.getCart();

    this.subscription = this.productService.getAll().subscribe(param => {
      this.products = param;
       
      this.route.queryParamMap.subscribe(param => {
        this.category = param.get('category'); 
        if(this.category){ 
          this.filterProductByCategory(this.category);
        }else{
          this.filteredProducts = this.products; 
          //console.log("ProductsComponent->products:"+JSON.stringify(this.products));
        }
      }); 

    }); 
    
  }

   

  filterProductByCategory(query: string){ 
    this.filteredProducts = (query) ?
      this.products.filter(p => p.category.toLowerCase().includes(query.toLocaleLowerCase())) : 
      this.products; 
        
  }

   

}
