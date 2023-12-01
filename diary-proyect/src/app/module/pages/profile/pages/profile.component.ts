import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthLoginService } from 'src/app/module/services/auth-login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {


  userAuth:any;


constructor (
  private activatedRoute:ActivatedRoute,
  private _authService:AuthLoginService,

){
  this.activatedRoute.params.subscribe(params =>{
    this.userAuth = this._authService.getUserLogeado();
    console.log(params['code']);
    
  })

}


}
