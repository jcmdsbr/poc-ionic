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
    this.onLoadContacts();
  }

  dismissRegister() {
    this.modalController.dismiss();
  }

  onLoadContacts() {
    this.contacts = this.service.get();
  }

  async create() {
    this.dismissRegister();
    const createModal = await this.modalController.create({
      component: ContactFormComponent
    });
    return await createModal.present();
  }

  delete(contact: Contact) {
    this.service.delete(contact.id.toString()).subscribe(() => this.onLoadContacts())
  }
  async update(contact: Contact) {

    const createModal = await this.modalController.create({
      component: ContactFormComponent,
      componentProps: {
        "flow": "Alterar",
        "contactId": contact.id
      }
    });

    createModal.onDidDismiss().then(() => this.onLoadContacts())

    return await createModal.present();
  }

  async detail(contact: Contact) {

    const createModal = await this.modalController.create({
      component: ContactFormComponent,
      componentProps: {
        "flow": "Detalhar",
        "contactId": contact.id
      },

    });
    return await createModal.present();
  }
}
