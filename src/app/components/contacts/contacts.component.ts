import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent {
  contact = {
    email: '',
    message: '',
  };
  submitted = false;
  successMessage = '';

  onSubmit() {
    if (this.isValid()) {
      this.successMessage = `The message has been successfully sent! Email: ${this.contact.email}, Text: ${this.contact.message}`;
      this.submitted = true;
      this.contact = {
        email: '',
        message: '',
      };
    }
  }

  isValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.contact.email || !this.contact.message) {
      alert('Enter an email and text before submitting the form.');
      return false;
    }

    if (!emailRegex.test(this.contact.email)) {
      alert('Enter a valid email address.');
      return false;
    }

    if (this.contact.message.length < 5) {
      alert('The message text must contain at least 5 characters.');
      return false;
    }

    return true;
  }
}
