import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { CourseComponent } from 'app/course/course.component';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public courses$: Observable<Course[]>;
  public beginnerCourses$: Observable<Course[]>;
  public advancedCourses$: Observable<Course[]>;

  constructor(private db: AngularFirestore) {

  }

  ngOnInit() {
    this.courses$ = this.db.collection('courses').snapshotChanges()
      .pipe(
        map(snaps => {
          return snaps.map(snap => {
            return <Course> {
              id: snap.payload.doc.id,
              ...snap.payload.doc.data() as {}
            };
          });
        })
    );

    this.beginnerCourses$ = this.courses$.pipe(
      map(courses => courses.filter(course => course.categories.includes('BEGINNER')))
    );

    this.advancedCourses$ = this.courses$.pipe(
      map(courses => courses.filter(course => course.categories.includes('ADVANCED')))
    );
    }

}
