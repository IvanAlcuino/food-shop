import { Injectable } from '@angular/core'; 
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import 'rxjs/operator/switchMap';
import 'rxjs/operator/map';
import { AppUser } from '../models/app-user';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User> = null;
  _isLogin = false;

  constructor(private afAuth: AngularFireAuth, private router: ActivatedRoute, private userService: UserService) { 
    this.user$ = afAuth.authState;
  }

  login(){
    let returnUrl = this.router.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    //console.log("after login: "+result);
      //.then(); can be use but having issue when Mosh Hamadani is using instead use
  }

  logout(){
    this.afAuth.auth.signOut();
    this._isLogin = false;
  }

  get appUser$():Observable<any>{
    if(!this.user$) return;
    return this.user$
      .switchMap((user:any) => {
        if(user) return this.userService.get(user.uid);
        
        return Observable.of(null);
      })
  }

  get isLogin(){
    return this._isLogin;
  }
}
