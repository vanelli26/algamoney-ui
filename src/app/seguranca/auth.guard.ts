import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.auth.isAcessTokenInvalido()) {
        console.log('Access token inválido, renovando token!')
        return this.auth.obterNovoAcessToken()
          .then(() => {
            if (this.auth.isAcessTokenInvalido()) {
              this.router.navigate(['/login']);
              return false;
            }
            return true;
          });
      } else if (next.data.roles && !this.auth.temQualquerPermissao(next.data.roles)) {
        this.router.navigate(['/nao-autorizado']);
        return false;
      }
      return true;
  }
}
