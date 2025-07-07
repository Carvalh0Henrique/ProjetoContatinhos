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
  searchTerm: string = '';
  selectedCategory: string = '';
  filteredContacts: contactField[] = [];
  submitted = false;
  mensagemError: string = '';

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

    this.formGroupContact.get('searchTerm')?.valueChanges.subscribe(() => {
      this.filterContacts();
    });

    this.formGroupContact.get('selectedCategory')?.valueChanges.subscribe(() => {
      this.filterContacts();
    });
  }

  loadContacts(){
    this.ContactService.getAll().subscribe({
      next: (json) => { 
        this.contacts = json;
        this.filterContacts();
      }
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
    this.submitted= true;
    if (this.formGroupContact.invalid) {
      this.mensagemError = 'Preencha todos os campos obrigatórios.';
      setTimeout(() => this.mensagemError = '', 3000);
      return;
    }
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

  filterContacts(): void {
    const term = this.searchTerm.toLowerCase() || '';
    const category = this.selectedCategory || '';

    this.filteredContacts = this.contacts.filter(contact => {
      const matchesTerm = (
        contact.name?.toLowerCase().includes(term) ||
        contact.lastName?.toLowerCase().includes(term) ||
        contact.email?.toLowerCase().includes(term) ||
        contact.phone?.toString().includes(term)
      );

      const matchesCategory = category ? contact.category === category : true;

      return matchesTerm && matchesCategory;
    });
  }
}