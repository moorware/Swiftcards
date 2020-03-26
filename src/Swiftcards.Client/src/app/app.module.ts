import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ClipboardModule } from '@angular/cdk/clipboard';

import { AppComponent } from './app.component';
import { MustMatchDirective } from './helpers/must-match.directive';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './layout/home/home.component';
import { SignupComponent } from './layout/auth/signup/signup.component';
import { SigninComponent } from './layout/auth/signin/signin.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { TokenInterceptor } from './helpers/token.interceptor';
import { CardsListComponent } from './layout/profile/cards-list/cards-list.component';
import { CardsNewComponent } from './layout/profile/cards-new/cards-new.component';
import { CardComponent } from './layout/card/card.component';
import { LinkDialogComponent } from './layout/profile/link-dialog/link-dialog.component';
import { DeleteDialogComponent } from './layout/profile/delete-dialog/delete-dialog.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'me', component: ProfileComponent },
  { path: ':link', component: CardComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    MustMatchDirective,
    HeaderComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    CardsListComponent,
    CardsNewComponent,
    CardComponent,
    LinkDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatStepperModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    ClipboardModule
  ],
  entryComponents: [
    LinkDialogComponent,
    DeleteDialogComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
