import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isArray } from 'util';
import { REQUEST_METHODS } from '../utils/global.constant';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  BASE_URL_LOCAL = "./assets/";
  BASE_URL_SERVER = "http://192.168.43.123:8080/api";

  constructor(
    private http: HttpClient,
  ) { }

  doApiCall(payload: Payload) {
    let httpOptions = {
      params: payload.params,
      body: payload.body
    }
    let BASE_URL = payload.isLocal ? this.BASE_URL_LOCAL : this.BASE_URL_SERVER;
    return this.http.request(payload.method || REQUEST_METHODS.GET, BASE_URL + payload.url, httpOptions)
      .pipe(map(res => {
        return res;
      }))
      .pipe(
        catchError(this.handleApiError.bind(this))
      );
  }

  private handleApiError(error: HttpErrorResponse) {
    let message = "";
    if (error.error instanceof ErrorEvent) {

    }
  }
}

export interface Payload {
  method?: "GET" | "POST" | "DELETE";
  url: string;
  headers?: HttpHeaders,
  params?: any;
  body?: any;
  isLocal?: boolean
}