import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import { CourseService } from 'app/shared/service/CourseService';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    classNameNeedToReg: string;
    regCode: string;

    classNameNeedToDel: string;
    delCode: string;

    newCourseName: string;
    newCourseLocation: string;
    newCourseContent: string;
    newTeacher: string;
    addCode: string;

    updateCourseName: string;
    updateCourseLocation: string;
    updateCourseContent: string;
    updateTeacher: string;
    updateCode: string;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private courseService: CourseService
    ) {}

    courses: CourseDto[] = [];

    coursesWithTN: CourseWithTNDto[] = [];

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getAllCourses() {
        this.courseService.getCourseInfo().subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            } else {
                this.courses = curDto;
            }
        });
    }

    getAllCoursesWithTN() {
        this.courseService.getCourseInfoWithTN().subscribe(curDto => {
            if (!curDto) {
                this.coursesWithTN = [];
            } else {
                this.coursesWithTN = curDto;
            }
        });
    }

    clearAllCourses() {
        this.courses = [];
    }

    clearAllCoursesWithTN() {
        this.coursesWithTN = [];
    }

    registerCourse(courseName) {
        this.courseService.register(courseName).subscribe(resp => {
            this.regCode = resp;
        });
    }

    addCourse() {
        const newCourse: CourseDto = {
            courseName: this.newCourseName,
            courseLocation: this.newCourseLocation,
            courseContent: this.newCourseContent,
            courseTeacher: this.newTeacher
        };

        this.courseService.add(newCourse).subscribe(resp => {
            this.addCode = resp;
        });
    }

    deleteCourse() {
        this.courseService.delete(this.classNameNeedToDel).subscribe(resp => {
            this.delCode = resp;
        });
    }

    updateCourse() {
        const updateCourse: CourseDto = {
            courseName: this.updateCourseName,
            courseLocation: this.updateCourseLocation,
            courseContent: this.updateCourseContent,
            courseTeacher: this.updateTeacher
        };

        this.courseService.update(updateCourse).subscribe(resp => {
            this.updateCode = resp;
        });
    }
}
