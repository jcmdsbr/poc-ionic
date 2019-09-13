import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserUtil } from 'src/app/utils/user.util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Input() title: string;
  @Input() isShowLogout: boolean = false;

  constructor(private navCtrl: NavController) { }

  ngOnInit() { }

  logout() {
    UserUtil.clear();
    this.navCtrl.navigateRoot('/login');
  }
}
