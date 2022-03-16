import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, take, tap } from 'rxjs';
import { Khoahoc } from './khoahoc.types';
import { KHOAHOC } from './mock-khoahoc';
@Injectable({
  providedIn: 'root'
})
export class KhoahocService {

  private _course: BehaviorSubject<any | null> = new BehaviorSubject(null);
  // _course$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _courses: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor() { }
  
  get courses$(): Observable<any>{
    return this._courses.asObservable();
  }
  get course$(): Observable<any>{
    return this._course.asObservable();
  }

  

  getKhoahoc(){
    return this._courses.next(KHOAHOC);
  }
  getKhoahocChitiet(id: number): Observable<Khoahoc>
    {
        return this._courses.pipe(
            take(1),
            map((courses) => {

                // Find the contact
                const course = courses.find(item => item.id === id) || null;

                // Update the contact
                this._course.next(course);

                // Return the contact
                return course;
            }),
            // switchMap((contact) => {

            //     if ( !contact )
            //     {
            //         return throwError('Could not found contact with id of ' + id + '!');
            //     }

            //     return of(contact);
            // })
        );
    }
  
}
