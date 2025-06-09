import { Component, OnInit } from '@angular/core';
import { contactField } from '../../contactField';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '../../Services/contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit{
  
  contacts: contactField[] = [];
  contact: contactField | null = null;
  formGroupContact: FormGroup;
  isEditing: boolean = false;
  mensagem: string = '';

  constructor(private ContactService: ContactService,
              private formBuilder: FormBuilder
  ) { 
    this.formGroupContact = formBuilder.group({        
      id: [''],
      name: [''],
      lastName: [''],
      nickname: [''],
      phone: [''],
      email: [''],
      dateBorn: [''],
      age: [''],
      gender: [''],
      city: [''],
      area: [''],
      category: [''],
      favorite: ['']
    });
  }

  ngOnInit(): void {
    this.loadContacts();
  } 

  loadContacts(){
    this.ContactService.getAll().subscribe({
      next: (json) => { this.contacts = json; }
      }
    )
  }

  selectById(contact: contactField) {
    this.ContactService.selectById(contact).subscribe({
      next: (json) => { this.contact = json; }
    }
    )
  }

  delete(contacts: contactField) {
    const confirmar = confirm(`Tem certeza que deseja excluir a tarefa "${contacts.name} ${contacts.lastName}"?`);
    if (confirmar) {
      this.ContactService.delete(contacts).subscribe({
        next: () => this.loadContacts()
    });
    }
  }

  onClickUpdate(contacts: contactField) {
    this.isEditing = true;
    this.formGroupContact.setValue(contacts);
  }

  update() {
      this.ContactService.update(this.formGroupContact.value).subscribe(
        {
          next: () => {
            this.loadContacts();
            this.clear();
          }
        }
      )
  }

  clear() {
    this.isEditing = false;
    this.formGroupContact.reset();
  }
}
