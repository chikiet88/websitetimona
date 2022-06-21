import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LectuerService {

  // private urlApi = 'https://v2api.timona.edu.vn/baiviet';
  private urlApi = 'http://localhost:3000/giangvien';


  private _giangviens: BehaviorSubject<any[] | null> = new BehaviorSubject(
      null
  );

  constructor(private http: HttpClient) {}

  get giangviens$(): Observable<any[]> {
      return this._giangviens.asObservable();
  }
  

 

  getGiangvien(): Observable<any[]> {
      return this.http.get<any[]>(this.urlApi).pipe(
          tap((giangviens) => {
              this._giangviens.next(giangviens);
          })
      );
  }
 
}
