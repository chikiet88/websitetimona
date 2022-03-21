import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddHeaderService {

  private urlApi = 'http://localhost:3000/header'
  post: any;
  private _themes: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _theme: BehaviorSubject<any | null> = new BehaviorSubject(null);

   
  constructor(private http:HttpClient) { }


  get themes$(): Observable<any>{
    return this._themes.asObservable();
  }
  get theme$(): Observable<any>{
    return this._themes.asObservable();
  }

  addHeader(data){
    return this.http.post(this.urlApi,{data}).subscribe({
      next: data => {
        this.post = data
      }
    })
  }

  getHeader(){
    return this.http.get(this.urlApi).pipe(
      map((themes) => {

          this._themes.next(themes);
          console.log(themes);
          
          
          return themes;
      }),
    )
  }
}
