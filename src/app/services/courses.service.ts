import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {first, map, take} from 'rxjs/operators';
import { OrderByDirection } from '@firebase/firestore-types';

import { Course } from 'app/model/course';
import { Observable } from 'rxjs';

import {convertSnaps} from '../utils/db-utils'
import { Lesson } from 'app/model/lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private db: AngularFirestore) { }

  loadAllCourses(): Observable<Course[]> {
    return this.db.collection('courses', ref => ref.orderBy('seqNo'))
      .snapshotChanges()
      .pipe(
        map(courses => convertSnaps(courses)),
        take(1)
      );
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.collection('courses', ref => ref.where('url', '==', courseUrl))
      .snapshotChanges()
      .pipe(
        map(courses => convertSnaps(courses)),
        map(courses => courses.length === 1 ? courses[0] : undefined),
        take(1)
      );
  }

  findLessons(courseId: string, sortOrder: OrderByDirection = 'asc',
  pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
    return this.db.collection(`courses/${courseId}/lessons`,
    ref => ref.orderBy('seqNo', sortOrder)
      .limit(pageSize)
      .startAfter(pageNumber * pageSize)
    ).snapshotChanges()
      .pipe(
        map(lessons => convertSnaps(lessons)),
        take(1)
      );
  }

}
