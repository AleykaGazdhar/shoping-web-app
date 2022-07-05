import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared-ui/guard/auth.guard';
import { isFalseAuthGuard } from './shared-ui/guard/isFalse-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'signup',
    canActivate:[isFalseAuthGuard],
    loadChildren: () =>
      import('./views/signup/signup.module').then((mod) => mod.SignupModule),
  },
  {
    path: 'login',
    canActivate:[isFalseAuthGuard],
    loadChildren: () =>
      import('./views/login/login.module').then((mod) => mod.LoginModule),
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
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./views/products/products.module').then(
        (mod) => mod.ProductsModule
      ),
  },
  {
    path: 'product-list',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./views/product-list/product-list.module').then(
        (mod) => mod.ProductListModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
