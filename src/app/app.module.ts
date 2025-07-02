import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ContactListComponent } from './Components/contact-list/contact-list.component';
import { AboutComponent } from './Components/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FavoritesComponent } from './Components/favorites/favorites.component';
import { provideHttpClient } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    RegisterComponent,
    HomeComponent,
    ContactListComponent,
    AboutComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
