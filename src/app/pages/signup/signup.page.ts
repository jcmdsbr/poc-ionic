import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { UserUtil } from 'src/app/utils/user.util';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form: FormGroup;
  title: string = 'Registrar-se';
  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private serviceAlert: AlertService,
    private service: AuthService,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(120),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }
  ngOnInit() {
  }

  register() {
    if (this.form.valid) {
      let user = this.form.value;
      this.service.signup(user).subscribe(() => {
        UserUtil.set(user);
        this.serviceAlert.success("Usuário cadastrado com sucesso!");
        this.navCtrl.navigateRoot('/home');
      });
    }
  }

  login() {
    this.navCtrl.navigateRoot('/login');
  }
}
