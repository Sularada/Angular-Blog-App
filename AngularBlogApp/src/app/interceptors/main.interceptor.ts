import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

/**
 * Fonksiyonel (stand-alone) interceptor
 */
export const mainInterceptor: HttpInterceptorFn = (req, next) => {
  // Angular DI-context’i içindeyiz, rahatça inject edebiliriz
  const messageService = inject(MessageService);
  const refreshToken = inject(UserService).refreshToken();
  /*  İsteği klonlayacaksanız burada yapın;  
      örneğin header ekleme vb.  */
  const newRequest: HttpRequest<any> = req.clone();
  //console.log(req);
  let isRefreshing = false;
  const storedRefreshToken = localStorage.getItem('refreshToken');
  return next(newRequest).pipe(
    catchError((error) => {
      if (error.status === HttpStatusCode.Unauthorized && storedRefreshToken && !isRefreshing) {
        isRefreshing = true;
        return refreshToken.pipe(
          switchMap((tokens: { accessToken: string; refreshToken: string; }) => {
            const updatedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            });
            isRefreshing = false;
            return next(updatedRequest);
          }),
          catchError(refreshError => {
            isRefreshing = false;
            //router.navigate(['/login']);
            return handleError(refreshError, messageService);
          })
        );
      } else {
        return handleError(error, messageService);
      }

    })
  );
};

/**
 * Ortak hata yöneticisi
 */
export const handleError = (
  error: any,
  messageService: MessageService
): Observable<never> => {
  switch (error.status) {

    case HttpStatusCode.Unauthorized:
      messageService.add({
        severity: 'warn',
        summary: 'Yetkisiz',
        detail: 'Oturumunuzun süresi doldu. Lütfen tekrar giriş yapın.',
      });
      // Gerekirse router.navigate(['login']) vb. çağırabilirsiniz.
      break;

    case HttpStatusCode.BadRequest:
      messageService.add({
        severity: 'error',
        summary: 'Geçersiz İstek',
        // Sunucudan özel mesaj geldiyse kullan
        detail: error.error?.message ?? 'İstek hatalı gönderildi.',
      });
      break;

    default:
      messageService.add({
        severity: 'error',
        summary: 'Bilinmeyen Hata',
        detail: error.message ?? 'Beklenmeyen bir hata oluştu.',
      });
      break;
  }

  return throwError(() => error);
};


// import {
//   HttpInterceptorFn,
//   HttpRequest,
//   HttpHandlerFn,
//   HttpStatusCode,
// } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { MessageService } from 'primeng/api';
// import { catchError, filter, switchMap, take, throwError } from 'rxjs';
// import { UserService } from '../services/user.service';
// import { Router } from '@angular/router';

// export const mainInterceptor: HttpInterceptorFn = (req, next) => {
//   const messageService = inject(MessageService);
//   const userService = inject(UserService);
//   const router = inject(Router);

//   const accessToken = localStorage.getItem('accessToken');

//   // Refresh isteklerini hariç tut
//   if (req.url.includes('/auth/refresh')) {
//     return next(req);
//   }

//   const authReq = req.clone({
//     setHeaders: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
//   });

//   return next(authReq).pipe(
//     catchError((error) => {
//       const storedRefreshToken = localStorage.getItem('refreshToken');

//       if (error.status === HttpStatusCode.Unauthorized && storedRefreshToken) {
//         if (!userService.isRefreshing) {
//           userService.isRefreshing = true;
//           userService.refreshTokenSubject.next(null); // temizle

//           return userService.refreshToken().pipe(
//             switchMap(tokens => {
//               userService.isRefreshing = false;
//               userService.refreshTokenSubject.next(tokens.accessToken);

//               const retryReq = req.clone({
//                 setHeaders: {
//                   Authorization: `Bearer ${tokens.accessToken}`,
//                 },
//               });
//               return next(retryReq);
//             }),
//             catchError(refreshErr => {
//               userService.isRefreshing = false;
//               router.navigate(['/login']);
//               return handleError(refreshErr, messageService);
//             })
//           );
//         } else {
//           // Başka bir istek zaten refresh yapıyor, bekle
//           return userService.refreshTokenSubject.pipe(
//             filter(token => token !== null),
//             take(1),
//             switchMap((token) => {
//               const retryReq = req.clone({
//                 setHeaders: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               });
//               return next(retryReq);
//             })
//           );
//         }
//       } else {
//         return handleError(error, messageService);
//       }
//     })
//   );
// };
