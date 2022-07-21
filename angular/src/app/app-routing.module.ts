import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared-ui/guard/auth.guard';
import { isFalseAuthGuard } from './shared-ui/guard/isFalse-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'signup',
    canActivate: [isFalseAuthGuard],
    loadChildren: () =>
      import('./views/signup/signup.module').then((mod) => mod.SignupModule),
  },
  {
    path: 'login',
    canActivate: [isFalseAuthGuard],
    loadChildren: () =>
      import('./views/login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: 'forgot-password',
    canActivate: [isFalseAuthGuard],
    loadChildren: () =>
      import(
        './views/forgot-password/forgot-password.module'
      ).then((mod) => mod.ForgotPasswordModule),
  },
  {
    path: 'recoverpassword/:userId/:token',
    loadChildren: () =>
      import(
        './views/recovery-password/recovery-password.module'
      ).then((mod) => mod.RecoveryPasswordModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./views/home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./views/user-profile/user-profile.module').then(
        (mod) => mod.UserProfileModule
      ),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
