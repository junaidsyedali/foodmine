import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideToastr, ToastNoAnimation } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      newestOnTop: false,
      closeButton: true,
      toastComponent: ToastNoAnimation, // import { provideAnimations } from '@angular/platform-browser/animations'; anuglar animations is deprecated, so we added this to not use animations such as fading in and fading out
    }),
  ],
};
