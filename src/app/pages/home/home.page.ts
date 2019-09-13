import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';
import { ModalController } from '@ionic/angular';
import { ContactFormComponent } from 'src/app/components/contact-form/contact-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  contacts: Observable<Contact[]>;
  title: string;
  constructor(
    private service: ContactsService,
    private modalController: ModalController) {
    this.title = "Lista de Contatos";
  }

  ngOnInit() {
    this.contacts = this.service.get();
  }

  dismissRegister() {
    this.modalController.dismiss();
  }

  async create() {
    this.dismissRegister();
    const createModal = await this.modalController.create({
      component: ContactFormComponent
    });
    return await createModal.present();
  }

  async update(contact: Contact) {
    this.dismissRegister();
    const createModal = await this.modalController.create({
      component: ContactFormComponent,
      componentProps: {
        "isUpdate": true,
        "contactId": contact.id
      }
    });
    return await createModal.present();
  }
}
