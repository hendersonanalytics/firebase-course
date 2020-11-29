import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyA0DO1tt5m-z_828CN8-v3UbZcy3D-rNu4",
  authDomain: "ejh-udemy-firebase-course.firebaseapp.com",
  databaseURL: "https://ejh-udemy-firebase-course.firebaseio.com",
  projectId: "ejh-udemy-firebase-course",
  storageBucket: "ejh-udemy-firebase-course.appspot.com",
  messagingSenderId: "937535807480",
  appId: "1:937535807480:web:70ce36855743294fd0800d"
};

firebase.initializeApp(config);
const db = firebase.firestore();

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // 79v9gOQFmWNiHxDXeMLH (ngrx in depth)
    // aG0ADGWd8ygRONievFZA course with nested lessons
    db.doc('courses/aG0ADGWd8ygRONievFZA')
      .get()
      .then(snap => console.log(snap.data()));
  }

}
