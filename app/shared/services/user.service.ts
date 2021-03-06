import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppComponent } from '../../app.component';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { 
    
  }
  
  save(user: firebase.User){
    this.db.object('/users/'+user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }

  get(uid:string): Observable<boolean>{ //AngularFireObject <AppUser>
    return this.db.object('/users/'+uid).valueChanges();
  }

}
