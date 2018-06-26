import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    //console.log(product);return;
    let result = this.db.list('/products').push(product);
    //console.log(result);
  }

  getAll(){ 
    return this.db.list('/products').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
     }); 
  }

  get(productId){
    return this.db.object('/products/'+productId).valueChanges();

  }

  update(productId, product){
    return this.db.object('products/'+productId).update(product);
  }

  delete(productId){
    //console.log(productId);
    let r = this.db.list('/products').remove(productId);
    //console.log(r);
    return r;
  }

}
