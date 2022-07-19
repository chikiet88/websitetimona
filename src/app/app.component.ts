import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
	
    constructor(private facebookService: FacebookService) { 

    }
    	/**
	 * Show a notification
	 *
	 * @param {string} type    Notification type
	 * @param {string} message Notification message
	 */
      
    ngOnInit(): void {
        this.initFacebookService();

      }
      private initFacebookService(): void {
        const initParams: InitParams = { xfbml:true, version:'v3.2'};
        this.facebookService.init(initParams);
      }
}
