import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DenemeComponent } from "./components/deneme/deneme.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { provideHttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user/user.reducer';
import { blogReducer } from './store/blog-filter/blogFilter.reducer';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DenemeComponent,
    NavbarComponent,
    HomepageComponent,
    StoreModule.forRoot({ userState: userReducer, blogFilter: blogReducer })
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
