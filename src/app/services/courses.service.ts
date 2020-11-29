import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {first, map, take} from 'rxjs/operators';

import { Course } from 'app/model/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private db: AngularFirestore) { }

  loadAllCourses(): Observable<Course[]> {
    return this.db.collection('courses', ref => {
      return ref
        .where('seqNo', '==', 5)
        .where('lessonsCount', '>=', 5);
    }).snapshotChanges()
      .pipe(
        map(snaps => {
          return snaps.map(snap => {
            return <Course> {
              id: snap.payload.doc.id,
              ...snap.payload.doc.data() as {} // cast needed to prevent TS error
            };
          });
        }),
        take(1) // makes stream complete after first value is emitted from firebase
      );
  }

}
