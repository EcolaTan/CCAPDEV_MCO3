import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../data_types/post';
import { Community } from '../data_types/community';
import { User } from '../data_types/user';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
    private readonly rootUrl = "https://ccpadev-mco3.onrender.com/"

    constructor(private http: HttpClient) {}

    getResultCount() {
        const endpoint = '/results/count'
        return this.http.get<number>(`${this.rootUrl}${endpoint}`)
    }

    getPosts(query: string, page: number) {
        const endpoint = "/post/query/"
        return this.http.get<Array<Post>>(`${this.rootUrl}${endpoint}${query}/${page - 1}`)
    }
}
