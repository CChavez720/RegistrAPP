import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import  { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { User } from 'src/models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  
}
