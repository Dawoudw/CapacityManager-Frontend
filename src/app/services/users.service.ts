import { Router } from '@angular/router';
import { CommonService } from './common.service';
import { User } from './../models/User';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private navCtrl: Router) {}
  // private _currentUserName: string;
  // public get currentUserName(): string {
  //   this.getCurrentUser()
  //     .then((res) => {
  //       this.currentUserName = res.username;
  //       console.log('UsersService getCurrentUser', res);
  //     })
  //     .catch(() => (this._currentUserName = ''));

  //   return this._currentUserName;
  // }
  // public set currentUserName(value: string) {
  //   console.log('UsersService set currentUserName', value);
  //   this._currentUserName = value;
  // }
  userChange: EventEmitter<any> = new EventEmitter();

  users: any[] = null;
  private async getUsersRequest(): Promise<User[]> {
    return await this.http
      .get<User[]>(CommonService.UsersPath)
      .toPromise()
      .then((res) => {
        //console.log('getUsersRequest request : ', res['users']);
        return res['users'];
      });
  }
  private async getUserByIdRequest(id): Promise<User> {
    // console.log('getUserById request : ');
    return await this.http
      .get<User>(`${CommonService.UsersPath}/${id}`)
      .toPromise();
  }
  async findUserById(id: string) {
    let obj: any;
    if (!this.users) {
      await this.getAllUsers(true);

      obj = this.users.find((u) => {
        return u.id == id;
      });
    } else if (this.users) {
      obj = this.users.find((u) => {
        return u.id == id;
      });
    }
    //   console.log('findUserById(id) obj', obj);
    return obj;
  }
  async findUserByEmail(email: string) {
    let obj: any;
    if (!this.users) {
      await this.getAllUsers(true);

      obj = this.users.find((u) => {
        return u.email == email;
      });
    } else if (this.users) {
      obj = this.users.find((u) => {
        return u.email == email;
      });
    }
    //   console.log('findUserById(id) obj', obj);
    return obj;
  }
  async getAllUsers(reload: boolean = false) {
    // let obj: User[] = [];
    if (reload) {
      await this.getUsersRequest().then((res) => {
        this.users = res;
      });
      this.users.map((user) => {
        user.username = `${user?.fname} ${user?.lname}`;
      });
    }
    // console.log('getAllUsers', this.users);
    return this.users;
  }
  getCurrentUser(): any {
    //  return await this.findUserById('c09a4f26-41ca-4de8-986b-795956cfcc59');

    // var uemail = localStorage.getItem("useremail") ?? alert('Undefined');
    /*
   let x = (foo !== null && foo !== undefined) ?
    foo :
    bar();*/
    let user = localStorage.getItem('current_user');

    //console.log('getCurrentUser  localStorage.getItem(current_user)', user);

    return JSON.parse(user) ?? user;
  }
  isLoggedIn(): boolean {
    let res = this.getCurrentUser() ? true : false;
    return res;
  }

  async userLogin(email: string, pass: string): Promise<any> {
    let obj: any;

    await this.getAllUsers(true)
      .then((res) => {
        obj = res.find((u) => {
          return u.email === email && u.password === pass;
        });

        console.log('userLogin obj', obj);
        if (obj) {
          localStorage.setItem('current_user', JSON.stringify(obj));
          this.userChange.emit(obj);
        }
      })
      .catch((err) => {
        return throwError(err);
      });

    return obj;
    // if (obj) {
    //   return obj;
    // } else this.redirectToLogin();
    //   console.log('findUserById(id) obj', obj);
  }
  public redirectToLogin(): void {
    // if (!this.checkCurrentUser())
    this.navCtrl.navigateByUrl('login');
    // this.router.navigate["login"];
    // window.location.replace("login");
  }
  public redirectToHome(): void {
    // if (!this.checkCurrentUser())
    this.navCtrl.navigate(['home']);
    // this.router.navigate["login"];
    // window.location.replace("login");
  }
  public signOut(): void {
    localStorage.clear();
    this.userChange.emit(null);
    this.redirectToHome();
  }

  async createUser(user: User): Promise<User> {
    return await this.http.post(CommonService.UsersPath, user).toPromise();
  }
}
