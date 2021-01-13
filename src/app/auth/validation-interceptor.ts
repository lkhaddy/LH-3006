import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ValidService } from "./validation.service";

@Injectable()
export class ValidationInterceptor implements HttpInterceptor {
  constructor(private validService: ValidService) {}
  //Dealing with tokens when logging in
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.validService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
