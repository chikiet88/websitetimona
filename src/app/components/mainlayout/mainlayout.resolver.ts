import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { MainlayoutService } from './mainlayout.service';
import { Khoahoc } from './mainlayout.type';



@Injectable({
    providedIn: 'root'
})
export class MainlayoutResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _khoahoc: MainlayoutService)
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
        private _KhoaHoc: MainlayoutService,
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
        const ids = route.paramMap.get('id');
        
        return this._KhoaHoc.getKhoahocChitiet(Number(ids))
                   .pipe(
                       // Error here means the requested contact is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');
                            console.log(parentUrl);
                            
                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}

