import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileModule } from './module/pages/profile/profile.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./module/pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    loadChildren: () => import('./module/pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path:'',
    loadChildren:()=> import('./module/pages/contact/contact.module').then(m=>m.ContactModule)
  },
  {
    path:'',
    loadChildren:()=> import('./module/pages/profile/profile.module').then(m=>m.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
