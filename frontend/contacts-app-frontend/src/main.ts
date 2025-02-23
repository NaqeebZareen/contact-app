import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { ContactListComponent } from './app/contact-list/contact-list.component';
import { ContactFormComponent } from './app/contact-form/contact-form.component';
import { ContactDetailComponent } from './app/contact-detail/contact-detail.component';

// Define routes
const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'contact/:id', component: ContactDetailComponent },
  { path: 'new', component: ContactFormComponent },
  { path: 'edit/:id', component: ContactFormComponent },
];

// Bootstrap the application
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Add routing configuration
    provideHttpClient(), // Add HttpClient
  ],
}).catch((err) => console.error(err));