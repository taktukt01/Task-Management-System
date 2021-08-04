import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user/user';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient

  ) { }


  url: string = 'https://localhost:44310/api/Account'
  token: string;
  errorMsg: string;

  httpOptionsToken = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      // Authorization: 'my-auth-token'
    })
  };

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      // Authorization: 'my-auth-token'

    })
  };




  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }



  registerUser(user: User): Observable<{}> {
    //  var date:Date = new Date();

    //post(url,body,header)
    return this.http.post(
      `${this.url}/Register`, user, this.httpOptions)
  }
  // when do we generate  a token?
  // --> When user Registers 
  // --> When user Logs in
  getToken(email: string, password: string): Observable<{}> {


    let urlSearchParams = new URLSearchParams();
    urlSearchParams.set('grant_type', 'password');
    urlSearchParams.set('username', email);
    urlSearchParams.set('password', password)

    let body = urlSearchParams.toString();


    // 1. Generate a token
    return this.http.post(
      'https://localhost:44310/token',
      //body
      body,
      this.httpOptions
    ).pipe(
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          this.errorMsg = `Error: ${error.error.message}`;
        } else {
          this.errorMsg = `Error: ${error.message}`;
        }
        console.log(this.errorMsg)
        return of([]);
      })
    )
  }



// returns: 
//{
//   "Email": "taktuktries1@gmail.com",
//   "HasRegistered": true,
//   "LoginProvider": null
// }
  loginUser(email: string, password: string): Observable<{}> {
    //grab the access token and save it.
    
    return this.http.get(
      `${this.url}/UserInfo`,   //   /api/Account/UserInfo
      {
        headers: new HttpHeaders({
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `bearer ${localStorage.getItem("token")}`
        })
      }
    );
  }






  // "access_token": "0_pEDYYyalCDy2T4N68sjqJZG9KBk6aUNHNdcwgs7cwshWJPXYeYtx_jIEJI-lO3M4qaCy1H--g_EMb9kUcUOSBPt0tjwS1BhqHyKbOWHgDSFQNUttRyoZXdcrzFSvx7Qj_0TWiVvC3KX6zHQYBV1vQx7zXuIW0ilZHn30gyihzg_kpod2jx8PevZgFxwrCya2wJLVFT7mH7m6pitvDlLC9AHVbsnhMwuZBOxv74MLwPflsaDrWrodgGrw5yMNvArC3ttVnYZd_rzUm5MuB-gFvfgp_7QMclaJFou629RzN5hhE5Qk-ro90Hnv10kLhINYPY9n_bB7FdRCPhQVCh1PhqYosQNAn1bSeFLXVf-6p81mC-37J09LDxD28jpOJkEEpoPruSrespJZCNtCUpMF6WkM72o37Q7LhFwliYME9SHUzv_elrZdFvjQ2Xb1Iyn4GrccyI066JP-C9boDJRIbxJpPwIc_UAd_PWMEMaE4V4ykFG8n7gbgDucpnVhZT",
  // "token_type": "bearer",

  //Send a login POST request with token passed 

}

    // localStorage.setItem("token" , to(token);