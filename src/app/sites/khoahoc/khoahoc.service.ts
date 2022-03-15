import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Khoahoc } from './khoahoc.types';
import { KHOAHOC } from './mock-khoahoc';
@Injectable({
  providedIn: 'root'
})
export class KhoahocService {

  private _course: BehaviorSubject<any | null> = new BehaviorSubject(null);
  // _course$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }
  
  get course$(): Observable<any>{
    return this._course.asObservable();
  }

  

  getKhoahoc(){
    return KHOAHOC;
  }
  getKhoahocChitiet(id:number):Observable<Khoahoc | undefined>{
   
     const detail = KHOAHOC.find(h=> h.id === id);
     this._course.next(detail);
     return of(detail);
  }
  
}
