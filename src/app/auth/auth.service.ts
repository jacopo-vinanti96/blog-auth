import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators"
import { User } from "./user.model";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    localId: string;
    expiresIn: number;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User | undefined>(undefined);
    tokenExpirationTimer!: ReturnType<typeof setTimeout>;
    constructor(
        private http: HttpClient,
        private router: Router,
        public location: Location
        ) {}

        onSignIn(user: {email: string, psw: string}) {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBUjhIHf2KeDuZ-lGEm5zytWrmtA48wdI',
            {email: user.email, password: user.psw, returnSecureToken: true}).pipe( 
                catchError (
                    error => {
                        return this.handleError(error);
                    }
                ),
                tap(
                    resData => {
                        this.handleAuth(
                            resData.email, resData.idToken, resData.localId, resData.expiresIn
                        );
                    }
                )
            )
        }

        onLogin(user: {email: string, psw: string}) {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBUjhIHf2KeDuZ-lGEm5zytWrmtA48wdI',
            {email: user.email, password: user.psw, returnSecureToken: true}).pipe( 
                catchError (
                    error => {
                        return this.handleError(error);
                    }
                ),
                tap(
                    resData => {
                        this.handleAuth(
                            resData.email, resData.idToken, resData.localId, resData.expiresIn
                        );
                    }
                )
            )
        }

        onLogout() {
            this.user.next(undefined);
            localStorage.removeItem('userData');
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([this.location.path()]);
        }

        autoLogin() {
            const localData = localStorage.getItem('userData');
            if (localData == undefined) {
                return;
            }
            const userData = JSON.parse(localData);
            const loadedUser = new User(userData.email, userData.id, userData.token, new Date(userData.expirationDate));
            if (loadedUser.token) {
                this.user.next(loadedUser);
                const expirationDuration = new Date(userData.expirationDate).getTime() - new Date().getTime();
                this.autoLogout(expirationDuration);
            }
        }
    
        autoLogout(expirationDuration: number) {
            this.tokenExpirationTimer = setTimeout(() => {
                this.onLogout();
            }, expirationDuration);
            
        }

        handleAuth(email: string, idToken: string, localId: string, expiresIn: number) {
            const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
            const user = new User(email, idToken, localId, expirationDate);
            this.user.next(user);
            localStorage.setItem('userData', JSON.stringify(user));
            this.autoLogout(expiresIn * 1000);
        } 

        handleError(errorRes: HttpErrorResponse) {
            let errorMessage = 'An error occurred';
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = "l'indirizzo email è già utilizzato da un altro account";
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    errorMessage = "l'accesso con password è disabilitato per questo progetto";
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMessage = "abbiamo bloccato tutte le richieste da questo dispositivo a causa di attività insolite. Riprovare più tardi";
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = "nessun record utente corrispondente a questo identificatore. L'utente potrebbe essere stato eliminato";
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = "la password non è valida o l'utente non dispone di una password";
                    break;
                case 'USER_DISABLED':
                    errorMessage = "l'account utente è stato disabilitato da un amministratore";
                    break;
                default:
            }
            return throwError(errorMessage);
        }
}