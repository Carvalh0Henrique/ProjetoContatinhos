import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../Services/contact.service';
import { FormBuilder } from '@angular/forms';
import { contactField } from '../../contactField';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {

  contacts: contactField[] = [];

  constructor(private ContactService: ContactService,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.selectByFavorite();
  }

  selectByFavorite() {
      this.ContactService.selectByFavorite().subscribe( favoritos =>{
        this.contacts = favoritos;
      }
      )
  }
}
