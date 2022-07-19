import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormdangkykhachhangService {
  private urlApi = 'https://v2api.timona.edu.vn/ticket';
  // private urlApi = 'http://localhost:3000/form';

    post: any;
    private _khachhang: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _khachhangchititet: BehaviorSubject<any | null> = new BehaviorSubject(null);

    constructor(private http: HttpClient) {}

    get khachhang$(): Observable<any> {
        return this._khachhang.asObservable();
    }
    get khachhangchitiet$(): Observable<any> {
      return this._khachhangchititet.asObservable();
  }
   

    getDataKhachhang() {
        return this.http.get(this.urlApi).pipe(
            map((khachhang) => {
                this._khachhang.next(khachhang);

                return khachhang;
            })
        );
    }
   
}
