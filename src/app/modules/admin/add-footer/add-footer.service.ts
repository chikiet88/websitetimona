import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AddFooterService {

  private urlApi = 'https://v2api.timona.edu.vn/cauhinh'
  post: any;
  private _themes: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _footer: BehaviorSubject<any | null> = new BehaviorSubject(null);


   
  constructor(private http:HttpClient) { }

  get footer$(): Observable<any>{
    return this._footer.asObservable();
  }
  get footers$(): Observable<any>{
    return this._themes.asObservable();
  }
 

  addFooter(data){
    return this.http.post(this.urlApi,{data}).subscribe({
      next: data => {
        this.post = data
      }
    })
  }

  getFooter(){
    return this.http.get('https://localhost:3000/footer').pipe(
      map((footer) => {

          this._footer.next(footer);
          return footer;
      }),
    )
  }
}
