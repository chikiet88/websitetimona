import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Khoahoc } from './theme.types';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private urlApi = 'https://v2api.timona.edu.vn/theme'
  post: any;
  private _themes: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _theme: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _menu: BehaviorSubject<any | null> = new BehaviorSubject(null);


  constructor(private http:HttpClient) { }


  get themes$(): Observable<Khoahoc[]>{
    return this._themes.asObservable();
  }
  get theme$(): Observable<Khoahoc[]>{
    return this._themes.asObservable();
  }
  get menu$(): Observable<any>{
    return this._menu.asObservable();
  }

  postTheme(data){
    return this.http.post(this.urlApi,data).subscribe({
      next: data => {
        this.post = data
      }
    })
  }

  getTheme(){
    return this.http.get(this.urlApi).pipe(
      map((themes) => {

          this._themes.next(themes);          
          return themes;
      }),
    )
  }
  getMenu(){
    return this.http.get('https://v2api.timona.edu.vn/menu').pipe(
      map((menu) => {

          this._menu.next(menu);
          return menu;
      }),
    )
  }
  
}
