import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(){ 
    //return this.db.list('/categories').valueChanges();
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
     });
  }

}
