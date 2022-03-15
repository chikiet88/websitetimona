import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Khoahoc } from './khoahoc.types';
import { KHOAHOC } from './mock-khoahoc';
@Injectable({
  providedIn: 'root'
})
export class KhoahocService {

  // private _courses: BehaviorSubject<Khoahoc[] | null> = new BehaviorSubject(null);
  _course$: BehaviorSubject<Khoahoc[]> = new BehaviorSubject<Khoahoc[]>([]);

  constructor() { }
  
  get course$(): Observable<Khoahoc[]>{
    return this._course$.asObservable();
  }

  

  getKhoahoc(){
    return KHOAHOC;
  }
  getKhoahocChitiet(id:number):Observable<Khoahoc | undefined>{
    return of(KHOAHOC.find(h=> h.id === id));
  }
  
}
