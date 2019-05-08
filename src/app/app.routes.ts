import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditResolver } from './user-edit/user-edit.resolver';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'details/:id', component: UserEditComponent, resolve:{data : UserEditResolver} }
];
