import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit{
  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators. required])
  })

  firebaseSvc = inject(FirebaseService);

  ngOnInit(){    
  }

  submit(){
    if(this.form.valid){
      this.firebaseSvc.signIn(this.form.value as User).then(res =>{
        console.log(res);
      })
    }
  }
}

