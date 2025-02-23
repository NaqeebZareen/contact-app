import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService, Contact } from '../contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isEditMode = false;
  contactId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      address: [''],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.contactId = +params['id'];
        this.loadContact(this.contactId);
      }
    });
  }

  loadContact(id: number): void {
    this.contactService.getContact(id).subscribe((contact) => {
      this.contactForm.patchValue(contact);
    });
  }

  onSubmit(): void {
    const contact: Contact = this.contactForm.value;
    if (this.isEditMode && this.contactId) {
      this.contactService.updateContact(this.contactId, contact).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.contactService.createContact(contact).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}