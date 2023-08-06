import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Community } from '../data_types/community';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommunityService {
    private readonly rootUrl = "https://ccpadev-mco3.onrender.com"

    constructor(private http: HttpClient) {}   

    getCurrentCommunity(communityId: string | null) {
        const endpoint = "/community/"
        const recurve = "recurve-main"

        if(communityId === null) {
            return this.http.get<Community>(`${this.rootUrl}${endpoint}${recurve}`)
        } else {
            return this.http.get<Community>(`${this.rootUrl}${endpoint}${communityId}`)
        }
    }

    getAllCommunities() {
        const endpoint = "/community"
        return this.http.get<Array<Community>>(`${this.rootUrl}${endpoint}`)
    }

    newCommunity(community: Community) {
        const endpoint = "/community"
        this.http.post(`${this.rootUrl}${endpoint}`, community.toSchema()).subscribe()
    }

    editCommunity(community: Community) {
        const endpoint = "/community/"
        this.http.patch(`${this.rootUrl}${endpoint}${community._id}`, community.toSchema()).subscribe()
    }

    deleteCommunity(communityId: string) {
        const endpoint = "/community/"
        this.http.delete(`${this.rootUrl}${endpoint}${communityId}`).subscribe()
    }
}
