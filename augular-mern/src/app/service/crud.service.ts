import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs';
import { Observable,throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';

export class Book{
  _id!:String;
  name!:String;
  price!:Number;
  description!:String;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // Node/Express API
  REST_API:string = 'http://localhost:8000/api';

  // Http header
  httpHeaders = new HttpHeaders().set('Content-Type',"application/json")

  constructor(private httpClient: HttpClient) {

  }
   // Add
  AddBook(data:Book) : Observable<any> {
    let API_URL = `${this.REST_API}/add-book`
    return this.httpClient.post(API_URL,data)
    .pipe(
      catchError(this.handleError)
    )
  }

  // Get app objects
  GetBooks() {
    return this.httpClient.get(`${this.REST_API}`)
  }

  // Get single object
  GetBook(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-book/${id}`
    return this.httpClient.get(API_URL, {headers: this.httpHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  // Update
  updateBook(id:any,data:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-book/${id}`
    return this.httpClient.put(API_URL,data, {headers:this.httpHeaders})
    .pipe(
      catchError(this.handleError)
    )
  }

  // delete
  deleteBook(id:any) : Observable<any> {
    let API_URL = `${this.REST_API}/delete-book/${id}`
    return this.httpClient.delete(API_URL, {headers:this.httpHeaders})
    .pipe(
      catchError(this.handleError)
    )

  }

  // error
  handleError(error:HttpErrorResponse) {
    let errorMessage = ''
    if(error.error instanceof ErrorEvent){
      // Handler client error
      errorMessage = error.error.message;
    } else{
      // Handler server error
      errorMessage = `Error Code : ${error.status}\nMessage: ${error.message}`
    }
    console.log(errorMessage)
    return throwError(errorMessage)
  }
}
