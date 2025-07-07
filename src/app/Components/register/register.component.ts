import { Component, OnInit } from '@angular/core';
import { contactField } from '../../contactField';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '../../Services/contact.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  contacts: contactField[] = [];
  formGroupContact: FormGroup;
  isEditing: boolean = false;
  mensagem: string = '';
  mensagemError: string = '';
  submitted= false;

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

    this.formGroupContact.get('dateBorn')?.valueChanges.subscribe(dateBorn => {
      const age = this.calculateAge(dateBorn);
      this.formGroupContact.get('age')?.setValue(age, { emitEvent: false });
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
    this.submitted= true;
    if (this.formGroupContact.invalid) {
      this.mensagemError = 'Preencha todos os campos obrigatórios.';
      setTimeout(() => this.mensagemError = '', 3000);
      return;
    }

    this.ContactService.save(this.formGroupContact.value).subscribe({
      next: json => {
        this.contacts.push(json);
        this.formGroupContact.reset();

        this.isEditing = true;
        this.mensagem = 'Tarefa adicionada com sucesso!';
        setTimeout(() => this.mensagem = '', 3000);
      }
    });
  }

  clear() {
    this.isEditing = false;
    this.formGroupContact.reset();
  }

  public calculateAge(dateBorn: string): number {

    if (!dateBorn) return 0;

    let birthDate: Date | null = null;

    if (/^\d{8}$/.test(dateBorn)) {
      const day = parseInt(dateBorn.substring(0, 2), 10);
      const month = parseInt(dateBorn.substring(2, 4), 10);
      const year = parseInt(dateBorn.substring(4, 8), 10);
      birthDate = new Date(year, month - 1, day);
    }

    if (!birthDate || isNaN(birthDate.getTime())) return 0;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}