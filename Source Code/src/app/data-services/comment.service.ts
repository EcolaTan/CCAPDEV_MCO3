import { Injectable } from '@angular/core';
import { Comment } from '../data_types/comment';
import { HttpClient } from '@angular/common/http';
import { CommentInfo } from '../data_types/commentInfo';
import { User } from '../data_types/user';
import { Community } from '../data_types/community';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private readonly rootUrl = "https://ccpadev-mco3.onrender.com"

    constructor(private http: HttpClient) {} //TODO add validators in a validator service

    /* DB Access */
    getCountUserComments(userId: string) {
        const endpoint = '/getUserCommentCount/'
        return this.http.get<number>(`${this.rootUrl}${endpoint}${userId}`)
    }

    getUserComments(userId: string, page: number) {
        const endpoint = "/comment/user/"
        return this.http.get<Array<Comment>>(`${this.rootUrl}${endpoint}${userId}/${page}`)
    }

    getPostComments(postId: string) {
        const endpoint = "/comment/post/"
        return this.http.get<Array<Comment>>(`${this.rootUrl}${endpoint}${postId}`)
    }

    getFromRootComment(commentId: string) {
        const endpoint = '/comment/post/viewComment/'
        return this.http.get<Array<Comment>>(`${this.rootUrl}${endpoint}${commentId}`)
    }

    getPostComment (postId: string) {
        const endpoint = "/commentid/"
        return this.http.get<Comment>(`${this.rootUrl}${endpoint}${postId}`)
    }

    reloadComment(commentId: string) {
        const endpoint = '/reload/comment/'
        return this.http.get<Comment>(`${this.rootUrl}${endpoint}${commentId}`)
    }

    newComment(comment: Comment) {
        const endpoint = "/comment"
        return this.http.post(`${this.rootUrl}${endpoint}`, comment.toSchema())
    }

    async replyComment(comment: Comment, parentId: string) {
        const endpoint = "/comment/reply/"
        return await firstValueFrom(this.http.patch<Comment>(`${this.rootUrl}${endpoint}${parentId}`, comment.toSchema()))
    }

    editComment(comment: Comment) {
        const endpoint = "/comment/"
        this.http.patch(`${this.rootUrl}${endpoint}${comment._id}`, comment.toSchema()).subscribe()
    }

    deleteComment(commentId: string) {
        const endpoint = "/comment/"
        this.http.delete(`${this.rootUrl}${endpoint}${commentId}`).subscribe()        
    }

    generateComment(info: CommentInfo, user: User, community: string, parentPost:string, replyingTo: string): Comment {
        return new Comment("temp", user, info.body!, info.layer!, 0, [], 0, [], [], replyingTo, parentPost,community,new Date(),false)
    }

    validateData (commentInfo: CommentInfo){
        if(commentInfo.body !== undefined){
            return true
        } else {
            return false
        }
    }
}
