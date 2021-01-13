import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ValidService } from "./validation.service";

@Injectable()
export class ValidationGuard implements CanActivate {
  constructor(private validService: ValidService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isValid = this.validService.getIsAuth();
    if(!isValid) {
      this.router.navigate(['/login']);
    }
    return isValid;
  }

}
