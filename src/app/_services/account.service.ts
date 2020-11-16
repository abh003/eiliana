import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    public userCheck;
    public rootUrl;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email, password) {
        return this.http.post<User>(`${environment.apiUrl}/login`, { email, password })
            .pipe(map(user => {
                this.userCheck = user;
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if (this.userCheck.success == '2') {
                   localStorage.setItem('user', JSON.stringify(this.userCheck.user));
                   this.userSubject.next(this.userCheck.user);
                   return this.userCheck;
                } else {
                   return this.userCheck;
                }
            }));
    }

    loginFirst(user: User) {
        return this.http.post<User>(`${environment.apiUrl}/loginfirst`, user)
            .pipe(map(user => {
                this.userCheck = user;
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if (this.userCheck.success == '1') {
                   localStorage.setItem('user', JSON.stringify(this.userCheck.user));
                   this.userSubject.next(this.userCheck.user);
                   return this.userCheck;
                } else {
                   return this.userCheck;
                }
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    checkUserExists(user: User) {
        return this.http.post<User[]>(`${environment.apiUrl}/checkuserexists`, user).pipe(map(response => response));
    }

    verifyotp(data: any): any {
        return this.http.post<User[]>(`${environment.apiUrl}/verifyotp`, data).pipe(map(response => response));
    }

    register(user: User) {
        return this.http.post<User[]>(`${environment.apiUrl}/signup`, user).pipe(map(response => response));
    }

    getAllCountry() {
        return this.http.get(`${environment.apiUrl}/fetchcountry`).pipe(map(res => res));
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
    
    // profile settings

    publicAnonymusUpdate(user_id,anonymous){
        let url = `${environment.apiUrl}`+'/publicAnonymusUpdate';
        if (user_id) {
          url = url+'?user_id='+user_id;
          url = url+'&anonymous='+anonymous;
        }
        return this.http.get(url).pipe(map(response => response));
    }

    updateProfile(params) {
        return this.http.post<User>(`${environment.apiUrl}/updateProfile`, params)
            .pipe(map(user => {
                this.userCheck = user;
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if (this.userCheck.success == '1') {
                    // update local storage
                    const user = { ...this.userCheck.user, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                   return this.userCheck;
                } else {
                   return this.userCheck;
                }
            }));
    }

    getAllEducation(user_id){
        let url = `${environment.apiUrl}`+'/getalleducation';
        if (user_id) {
          url = url+'?user_id='+user_id;
        }
        return this.http.get(url).pipe(map(response => response));
    }

    fetchEducationType() {
        return this.http.get(`${environment.apiUrl}/fetchEducationType`).pipe(map(res => res));
    }

    registerEducation(education: any) {
        return this.http.post<User[]>(`${environment.apiUrl}/registerEducation`, education).pipe(map(response => response));
    }

    getEducationById(id: string) {
        let url = `${environment.apiUrl}`+'/getEducationById';
        if (id) {
          url = url+'?id='+id;
        }
        return this.http.get(url).pipe(map(response => response));
    }

    updateEducation(params: any) {
        return this.http.post<User[]>(`${environment.apiUrl}/updateEducation`, params).pipe(map(response => response));
    }

}