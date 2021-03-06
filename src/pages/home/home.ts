import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ProfilePage } from '../profile/profile';
import { Http, Headers, RequestOptions } from "@angular/http";
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  @ViewChild("username") username;
  @ViewChild("password") password;
  data: string;
  items: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private http: Http,
    public loading: LoadingController
  ) { }


  signUp() {
    this.navCtrl.push(RegisterPage);
  }

  signIn() {
    //// check to confirm the username and password fields are filled
    if (this.username.value == "") {

      let alert = this.alertCtrl.create({

        title: "ATTENTION",
        subTitle: "Username field is empty",
        buttons: ['OK']
      });
      alert.present();
    }



    else

      if (this.password.value == "") {
        let alert = this.alertCtrl.create({

          title: "ATTENTION",
          subTitle: "Password field is empty",
          buttons: ['OK']
        });
        alert.present();
      }
      else {

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });


        let data = {
          username: this.username.value,
          password: this.password.value
        };



        let loader = this.loading.create({
          content: 'Processing please wait...',
        });

        loader.present().then(() => {


          this.http.post('http://localhost/login.php', data, options)
            
            .subscribe(response => {


              console.log(response);
              let res = response.json();
              console.log(res.auth);
              
              loader.dismiss();
              this.navCtrl.push(ProfilePage, data);

              
              if (res.auth === 'true') {

                let alert = this.alertCtrl.create({
                  title: "CONGRATS",
                  subTitle: `Hello ${res.username}`,
                  buttons: ['OK']
                });

                // let name = 'sahan';
                // let str = `Hello ${name}`;

                alert.present();
                this.navCtrl.push(ProfilePage, data);
              } else {
                let alert = this.alertCtrl.create({
                  title: "ERROR",
                  subTitle: "Your Login Username or Password is invalid",
                  buttons: ['OK']
                });

                alert.present();
              }
            });
        });
      }

  }

}
