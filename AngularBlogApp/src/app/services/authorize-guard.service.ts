// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';
// import { Router } from '@angular/router';
// @Injectable({
//   providedIn: 'root'
// })

// export class AuthorizeGuardService {

//   constructor(private router:Router) { }
//   canActivate(next:ActivatedRouteSnapshot,
//     state:RouterStateSnapshot
//   ):  boolean {
//     if(localStorage.getItem("accessToken") !==''){
//       return true
//     }else{
//       alert('Please login')
//        this.router.navigate(['login']);
//        return false
//     }
//   }
// }
