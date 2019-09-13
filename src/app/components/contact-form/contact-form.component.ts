import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
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

  @Input() isUpdate: boolean = false;
  @Input() contactId: string;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private serviceAlert: AlertService,
    private service: ContactsService,
    private serviceAddress: ViacepService,
    private loadingController: LoadingController) {
    this.isUpdate = this.contactId && this.contactId.length > 0;
    this.title = this.isUpdate ? "Alterar Contato" : "Cadastrar Contato";
    this.initializeForm();
  }

  ngOnInit() {
    if (this.isUpdate) {
      this.service.getById(this.contactId).subscribe((res) => {
        this.form.patchValue(res);
        this.form.controls['id'].disable();
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
        Validators.minLength(11),
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

  async back(message: string = "") {
    if (message.length != 0) { await this.serviceAlert.success(message) }
    this.navCtrl.navigateRoot('/home');
  }

  async save() {
    if (this.form.valid) {
      let contact = this.form.value;
      if (this.isUpdate) {
        contact.id = this.contactId;
        this.service.update(contact).subscribe(async () =>
          await this.back("Produto alterado com sucesso!"));
      } else {
        this.service.create(contact).subscribe(async () =>
          await this.back("Produto cadastrado com sucesso!"));
      }
    }
  }

}
