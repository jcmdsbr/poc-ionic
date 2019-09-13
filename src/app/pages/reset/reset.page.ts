import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  form: FormGroup;
  title: string = "Resetar a Senha !";

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

  reset() {
    this.service.getFirstByEmail(this.form.controls["email"].value).subscribe((users) => {
      if (users && users.length > 0) {
        let user = this.form.value;
        user.id = users[0].id;
        this.service.reset(user).subscribe(() => {
          this.navCtrl.navigateRoot('/home');
        })
      }
    })

  }
}
