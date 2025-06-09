import { Component, OnInit } from '@angular/core';
import { contactField } from '../../contactField';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '../../Services/contact.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  contacts: contactField[] = [];
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

  save() {
    this.ContactService.save(this.formGroupContact.value).subscribe(
      {
        next: json => {
          this.contacts.push(json);
          this.formGroupContact.reset();

          this.isEditing = true
          this.mensagem = 'Tarefa adicionada com sucesso!';

          setTimeout(() => {
            this.mensagem = '';
          }, 3000);
        }
      }
    )
  }

  clear() {
    this.isEditing = false;
    this.formGroupContact.reset();
  }
}

