import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { loginGuard } from './guards/login.guard';
import { PurchasedComponent } from './components/purchased/purchased.component';
import { ContactsComponent } from './components/contacts/contacts.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [loginGuard] },
  { path: 'search', component: SearchComponent },
  { path: 'info/:id', component: InfoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'purchased', component: PurchasedComponent },
  { path: 'contacts', component: ContactsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
