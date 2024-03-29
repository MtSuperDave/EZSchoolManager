import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, merge, of, Subscription} from "rxjs";
import {MatTable} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {catchError, concatMap, debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {CourseDetailComponent} from "../course-detail/course-detail.component";
import {MatSort} from "@angular/material/sort";
import {Course, CourseResolved} from "../../../../shared/models/course.model";
import {CourseService} from "../../../../shared/services/course.service";
import {CourseDeleteConfirmationComponent} from "../course-delete-confirmation/course-delete-confirmation.component";
import {MatPaginator} from "@angular/material/paginator";
import {CourseDatasource} from "../../../../shared/services/course.datasource";
import {AuthService} from "../../../../shared/services/auth.service";


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild(MatTable)
  matTable: MatTable<any>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild('input')
  input: ElementRef;

  dataSource: CourseDatasource;
  numCourses = 100;

  displayedColumns = ["id", "name",  "description", "roomName", "teacherLastName", "edit", "delete"]

  $subscription = new Subscription();
  isAuthenticated: boolean = false;

  constructor(private courseService: CourseService,
              private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new CourseDatasource(this.courseService);
    this.dataSource.loadCourses('', 'name','asc', '0', '12');
    this.$subscription.add(
        this.dataSource.numCourses$.subscribe(
            count => this.numCourses = count
        )
    );

    this.$subscription.add(
      this.authService.authStatusChanges()
        .subscribe(
          authenticated => {
            this.isAuthenticated = authenticated;
          }
        )
    );
  }

  ngAfterViewInit() {

    this.$subscription.add(
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0)
    );

    this.$subscription.add(
      fromEvent(this.input.nativeElement,'keyup')
          .pipe(
              debounceTime(350),
              distinctUntilChanged(),
              tap(() => {
                this.paginator.pageIndex = 0;
                this.getCourses();
              })
          )
          .subscribe()
    );

    this.$subscription.add(
      merge(this.paginator.page, this.sort.sortChange)
        .pipe(
            tap(() => {
                  this.getCourses();
                }
            )
        )
        .subscribe()
    );

  }

  getCourses() {

    this.dataSource.loadCourses(
        this.input.nativeElement.value,
        this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex.toString(),
        this.paginator.pageSize.toString()
    );
  }

  editCourse(course: CourseResolved) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": true, course };

    const dialogRef =  this.dialog.open(CourseDetailComponent, dialogConfig);

    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          tap(formVal => {
            if (formVal) {
              formVal.id = course.id;
            }
          }),
          concatMap(formVal => {
            if (formVal) {
              return this.courseService.updateCourse(formVal);
            } else {
              return of({});
            }
          }),
          catchError(val => of(`error caught: ${val}`))
        )
        .subscribe(
          returnVal => {
            if (returnVal['result'] === 'success') {
              this.getCourses();
            }
          }
        )
    );
  }

  createCourse() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {"edit": false };

    const dialogRef =  this.dialog.open(CourseDetailComponent, dialogConfig);

    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          concatMap(formVal => {
            if (formVal) {
              return this.courseService.createCourse(formVal);
            } else {
              return of({});
            }
          }),
          catchError(err => of(`error caught: ${err}`))
        )
        .subscribe(
          returnVal => {
            if (returnVal['result'] === 'success') {
              this.getCourses();
            }
          }
        )
    );
  }


  deleteCourse(course: Course) {

    const dialogRef = this.dialog.open(CourseDeleteConfirmationComponent, {
      maxWidth: "400px",
      data: {
        id: course.id,
        name: `${course.name}`,
        title: "Are you sure?",
        message: `You are about to delete ${course.name}`
      }
    });

    this.$subscription.add(
      dialogRef.afterClosed()
        .pipe(
          concatMap(dialogResult => {
            if (dialogResult && dialogResult === true) {
              return this.courseService.deleteCourse(course.id);
            } else {
              return of({'result': 'skipped'});
            }
          }),
          catchError(
            err => { return of(`error caught: ${err}`) }
          )
        )
        .subscribe(
          deletionResult => {
            if (deletionResult && deletionResult.result && deletionResult.result === 'success') {
              this.getCourses()
            }
          },
          error => console.log('error in deletion of course ', error)
        )
    );
  }

  ngOnDestroy() {
      this.$subscription.unsubscribe();
  }

}
