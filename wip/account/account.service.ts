import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  setName(email: string, name: string) {
    const userData = this.getData();
    this.http.post('http://localhost:8080/api/user.php', {email: email, name: name});
  }

  getData(): AuthResponseData | void {
    const localData = localStorage.getItem('userData');
    if (localData == undefined) {
      return;
    }
    return JSON.parse(localData);
  }
}
