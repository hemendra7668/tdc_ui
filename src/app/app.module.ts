import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // For routing
import { AppComponent } from './app.component';
import { LocalstorageService } from './service-front/localstorage.service'; // Import the service
import { routes } from './app.routes'; // Import routes
import { appConfig } from './app.config'; // Import any additional config

@NgModule({
  declarations: [
    AppComponent // Declare the root component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) // Configure routing
  ],
  providers: [
    LocalstorageService,
    appConfig // Provide any additional config
  ],
  bootstrap: [AppComponent] // Bootstrap the root component
})
export class AppModule { }
