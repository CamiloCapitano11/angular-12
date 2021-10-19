import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bills } from 'src/app/shared/models/bill.interface';

@Injectable({
    providedIn: 'root',
})

export class BillsService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<Bills[]>{
      //debugger
      return this.http.get<Bills[]>(`${environment.API_URL}/Facturas`).pipe(catchError(this.handlerError));
    }

    sendBill(json: any){
      return this.http.post(`${environment.API_URL}/Facturas`, json).pipe(catchError(this.handlerError));
    }

    handlerError(error: { message: any; }): Observable<never> {
      let errorMessage = 'Error unknown';
      if (error) {
        errorMessage = `Error ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
    }
}