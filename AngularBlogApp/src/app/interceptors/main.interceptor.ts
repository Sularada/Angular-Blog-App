import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

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

  return next(newRequest).pipe(
    // refresh token için daha sonra istek parametre olarak verilebilir
    catchError((error) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        console.log("errror : " + error + " statu : " + error.status);
        refreshToken.subscribe(() => {
          return next(newRequest).pipe(catchError(error => {
            return handleError(error, messageService)
          }))
        })
      } else {
        return handleError(error, messageService)
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
