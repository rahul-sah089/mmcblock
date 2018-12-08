import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import sampleConfig from '../.samples.config';

@Injectable()
export class UserService {
    apiUrl :any;
    constructor(private http: HttpClient) {
        this.apiUrl = sampleConfig.resourceServer.apiUrl;
     }

    getAll() {
        return this.http.get<User[]>(this.apiUrl+`/users`);
    }

    getById(id: number) {
        return this.http.get(this.apiUrl+`/users/` + id);
    }

    register(user: User) {
        return this.http.post(this.apiUrl+`/users/register`, user);
    }

    update(user: User) {
        return this.http.put(this.apiUrl+`/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(this.apiUrl+`/users/` + id);
    }
}