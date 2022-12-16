import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {};

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this.authService.user.pipe(take(1), map(user => { // use take(1) so that we don't have an ongoing listener. We only need to execute this when the route is hit from the router
			const isAuth = !!user; // !! converts a truish object to true. An object that is not null or undefined is true-ish.
			if (isAuth) {
				return true;
			}
			return this.router.createUrlTree(['/auth']);
		}));
	}
}