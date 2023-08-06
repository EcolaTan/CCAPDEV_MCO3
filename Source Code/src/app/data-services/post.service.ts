import { Injectable } from '@angular/core';
import { Post } from '../data_types/post';
import { Community } from '../data_types/community';
import { User } from '../data_types/user';
import { HttpClient } from '@angular/common/http';
import { PostInfo } from '../data_types/postInfo';

@Injectable({
  providedIn: 'root'
})
export class PostService {
    private readonly rootUrl = "https://ccpadev-mco3.onrender.com/"

    constructor(private http: HttpClient) {}

    getUserPostCount(userId: string) {
        const endpoint = '/getAllUserPosts/'
        return this.http.get<number>(`${this.rootUrl}${endpoint}${userId}`)
    }

    getAllPostCount() {
        const endpoint = '/getAllPosts'
        return this.http.get<number>(`${this.rootUrl}${endpoint}`)
    }

    getAllCommunityPostCount(communityId: string) {
        const endpoint = '/getAllPosts/'
        return this.http.get<number>(`${this.rootUrl}${endpoint}${communityId}`)
    }

    getAllPosts(page: number, filter: number) {
        const endpoint = "/post/home/"
        return this.http.get<Array<Post>>(`${this.rootUrl}${endpoint}${page - 1}/${filter}`)
    }

    getCommunityPosts(communityId: string, page: number) {
        const endpoint = "/post/community/"
        return this.http.get<Array<Post>>(`${this.rootUrl}${endpoint}${communityId}/${page}`)
    }

    getUserPosts(userId: string, page: number) {
        const endpoint = "/post/user/"
        return this.http.get<Array<Post>>(`${this.rootUrl}${endpoint}${userId}/${page}`)
    }

    getCurrentPost(postId: string) {
        const endpoint = "/post/"
        return this.http.get<Post>(`${this.rootUrl}${endpoint}${postId}`)
    }

    generatePost(info: PostInfo, user: User, community: Community): Post {
        return new Post("temp", community, info.title!, info.body!, user, 0, [], 0, [], 0, [], new Date(), false)
    }

    editTitleAndBody(post: Post, newTitle: string, newBody: string): Post {
        post.title = newTitle
        post.body = newBody
        return post
    }

    validateData(postInfo: PostInfo): boolean {
        if(postInfo.title !== undefined && postInfo.body !== undefined && postInfo.title !== "" && postInfo.body !== "") {
            return true
        } else {
            return false
        }
    }

    newPost(post: Post) {
        const endpoint = "/post"
        this.http.post(`${this.rootUrl}${endpoint}`, post.toSchema()).subscribe()
    }

    editPost(post: Post) {
        const endpoint = "/post/"
        return this.http.patch(`${this.rootUrl}${endpoint}${post._id}`, post.toSchema())
    }

    deletePost(postId: string) {
        const endpoint = "/post/"
        this.http.delete(`${this.rootUrl}${endpoint}${postId}`).subscribe()
    }
}
