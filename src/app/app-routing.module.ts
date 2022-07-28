import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { OffersComponent } from './offers/offers.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SellcarComponent } from './sellcar/sellcar.component';

const routes: Routes = [
  { path: '', component: OffersComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'sell/car', component: SellcarComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
