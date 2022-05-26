import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { KhoahocService } from './khoahoc.service';
import { Khoahoc } from './khoahoc.types';



@Injectable({
    providedIn: 'root'
})
export class KhoahocResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _khoahoc: KhoahocService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Khoahoc[]>
    {
        return this._khoahoc.getKhoahoc();
    }
}

@Injectable({
    providedIn: 'root'
})
export class KhoahocDetailResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _KhoaHoc: KhoahocService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Khoahoc>
    {
        const slug = route.paramMap.get('slug');
        return this._KhoaHoc.getKhoahocChitiet(slug)
                   .pipe(
                       // Error here means the requested contact is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');
                            
                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}

