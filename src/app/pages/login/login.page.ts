import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { SignupPage } from '../signup/signup.page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { AlertService } from 'src/app/services/alert.service';
import { UserUtil } from 'src/app/utils/user.util';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  title: string = 'Efetuar login';
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

  forgotPassword() {
    this.navCtrl.navigateRoot('/reset');
  }

  async login() {
    if (this.form.valid) {
      let login = this.form.value;
      this.service.login(login).subscribe(async (login) => {
        if (!login || login.length == 0) {
          await this.serviceAlert.error("E-mail ou senha inválidos");
        } else {
          UserUtil.set(login[0]);
          this.navCtrl.navigateRoot('/home');
        }
      });
    }
  }

  register() {
    this.navCtrl.navigateRoot('/signup');
  }
}
