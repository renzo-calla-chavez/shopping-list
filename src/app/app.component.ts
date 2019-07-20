import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyD2MnQ8IJKs0zFe2CKt9C2qZhVsFLe9NG8',
      authDomain: 'ng-recipe-book-2dd2b.firebaseapp.com',
      databaseURL: 'https://ng-recipe-book-2dd2b.firebaseio.com',
      projectId: 'ng-recipe-book-2dd2b',
      storageBucket: '',
      messagingSenderId: '382038984870',
      appId: '1:382038984870:web:70258057697bac1f'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
