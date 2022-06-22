import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturerPageService {

 
  private urlApi = 'https://v2api.timona.edu.vn/giangvien';
//   private urlApi = 'http://localhost:3000/giangvien';


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
