import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as usersJson from '../../assets/users.json';
import { iuser } from '../modles/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersDB: iuser[] = usersJson.default

  private _user$ = new BehaviorSubject<iuser>(this.getById(5))
  public user$ = this._user$.asObservable()
  constructor() { }

  public setCurrUser(id) {
    const user = this.getById(id)
    this._user$.next(user)
  }
  public
  public getUsers() {
    return this.usersDB
  }
  public getCurrUser() {
    return this._user$.value
  }

  public getById(id: number) {
    return this.usersDB.find(user => user.id == id)
  }

  public checkLogin(id) {
    return this._user$.value.id === id
  }
}
