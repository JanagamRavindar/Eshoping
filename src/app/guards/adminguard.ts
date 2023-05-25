import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Injectable()

export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService, private routes: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.displayUsername && this.authService.isAdmin) {
            return true
        }
        else {
            this.routes.navigate(['unauthorised']);
            return false;
        }
    }
}

