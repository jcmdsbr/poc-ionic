import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { ViacepService } from 'src/app/services/viacep.service';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {

  form: FormGroup;
  title: string = '';
  isDisabled: boolean = false;

  @Input() flow: string = "Cadastrar";
  @Input() contactId: string;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private serviceAlert: AlertService,
    private service: ContactsService,
    private serviceAddress: ViacepService,
    private loadingController: LoadingController,
    private modalController: ModalController) {
    this.title = this.flow + " Contato";
    this.initializeForm();
  }

  ngOnInit() {
    if (this.flow != "Cadastrar") {
      this.service.getById(this.contactId).subscribe((response) => {
        this.form.patchValue(response);
        this.form.patchValue({
          "address.street": response.address.street,
          "address.zipcode": response.address.zipcode,
          "address.district": response.address.district,
          "address.city": response.address.city
        });

        this.form.controls['id'].disable();

        if (this.flow == "Detalhar") {
          this.form.disable();
          this.isDisabled = true;
        }
      })
    }
  }

  initializeForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(120),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      cpf: ['', Validators.compose([
        Validators.minLength(11),
        Validators.required
      ])],
      phone: ['', Validators.compose([
        Validators.required
      ])],
      "address.zipcode": ['', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])],
      "address.street": [''],
      "address.district": [''],
      "address.city": [''],
    });
  }
  async getAddress() {
    if (this.form.controls["address.zipcode"].value.length > 0) {
      const loading = await this.loadingController.create({
        message: 'Buscando cep...'
      });

      await loading.present();

      this.serviceAddress.get(this.form.controls["address.zipcode"].value)
        .subscribe(async (response) => {
          await loading.dismiss();
          this.form.patchValue({
            "address.street": response.street,
            "address.district": response.district,
            "address.city": response.city
          });
        });
    }
  }

  exit() {
    this.modalController.dismiss();
  }

  save() {
    if (this.form.valid && !this.isDisabled) {
      let contact = this.form.value;

      contact.image = "http://lorempixel.com/50/50/";

      if (this.flow == "Alterar") {
        contact.id = this.contactId;
        this.service.update(contact).subscribe(() => this.exit());
      } else {
        this.service.create(contact).subscribe(() => this.exit());
      }
    }
  }

}
