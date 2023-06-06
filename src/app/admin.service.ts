import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  userUrl: string = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<any> {
    return this.http.get(this.userUrl);
  }
}
