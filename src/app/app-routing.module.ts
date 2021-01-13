import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidationGuard } from './auth/validation.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostGenerateComponent } from './posts/post-create/post-generate.component';
import { PostViewComponent } from './posts/post-list/post-view.component';

const routes: Routes =[
  { path: '', component: PostViewComponent },
  { path: 'create', component: PostGenerateComponent, canActivate: [ValidationGuard] },
  { path: 'edit/:postId', component: PostGenerateComponent, canActivate: [ValidationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ValidationGuard]
})

export class AppRoutingModule {

}
