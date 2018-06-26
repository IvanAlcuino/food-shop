import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from '../models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { 
  }
  
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    //console.log("getCardID: " + cartId);
    //return this.db.object('/shopping-carts/'+cartId).valueChanges();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      // .map((x:ShoppingCart) => new ShoppingCart(x.itemsMap));
     .map((x:any) => { //first map
        //console.log(" items in service: " + JSON.stringify(x.items));
        if(!x) return null;
        //console.log("x: " + JSON.stringify(x));
        let shoppingCart = new ShoppingCart(x.items);
        //console.log("shoppingCart in service: " + JSON.stringify(shoppingCart));
        //let items.text = items.text.toUpperCase();
        return shoppingCart; 
    });
  }

  async addToCart(product: Product) { 
    this.updateItem(product, 1);
  }

  async subtractToCart(product: Product) {
    // let cartId = await this.getOrCreateCartId(); 
    // let item$ = this.getItem(cartId, product.key);

    // //console.log(product);
    // item$.snapshotChanges().take(1).subscribe(item => {
    //   //console.log(item);
    //   if(item.key!==null) item$.update({ quantity: item.payload.val().quantity - 1}); 
    // }); 

    this.updateItem(product, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId+'/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> { //async the method will be observable with the add await when requesting.
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);

    return result.key;

  }

  

  private async updateItem(product: Product, changeQty: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    //console.log(" product:"+ JSON.stringify(product));
    item$.snapshotChanges().take(1).subscribe((item:any) => {
      //console.log(item);
      if (item.key !== null){
        if(item.payload.val().quantity==1 && changeQty == -1){
          item$.remove();
          //this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).remove();
        }else{ 
          item$.update({ 
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: item.payload.val().quantity + changeQty  
          });
        }
      } 
      else{ 
        item$.set({ 
          product: product, 
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price, 
          quantity: changeQty 
        });
      } 
    });
  }

}
