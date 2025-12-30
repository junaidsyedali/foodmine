import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/url';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUsertoLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to FoodMine ${user.name}`, 'Login Successful');
        },
        error: (err) => {
          this.toastrService.error(err.error.message, 'Login Failed');
        },
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUsertoLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to FoodMine ${user.name}`, 'Register Successful');
        },
        error: (err) => {
          this.toastrService.error(err.error.message, 'Register Failed');
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem('user');
    window.location.reload();
  }

  private setUsertoLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem('user');
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
