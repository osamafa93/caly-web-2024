import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OtpComponent } from './components/otp/otp.component';
import { AuthGuard } from './guards/auth/auth.guard';

const Routing: Routes = [

	{ path: '', redirectTo: '/user/home2', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'otp', component:OtpComponent},

	{
		path: 'user',
		// canActivate: [AuthGuard],
		loadChildren: () =>
		import('./modules/user/user.module').then((m) => m.UserModule),
	}

];


@NgModule({
  imports: [
		RouterModule.forRoot(Routing, { preloadingStrategy: PreloadAllModules })
	],
  exports: [RouterModule]
})
export class AppRoutingModule { }
