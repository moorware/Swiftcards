import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("auth_token");

        if (token) {
            const _req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })

            return next.handle(_req);
        }
        else {
            return next.handle(req);
        }
    }
}
