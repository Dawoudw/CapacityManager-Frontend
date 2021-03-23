import { Status } from './../enums/status.enum';
import { Issue } from 'src/app/models/Issue';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, pipe, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonService, compare } from './common.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  constructor(private http: HttpClient) {}
  getIssuesPromise(): Promise<any> {
    return this.http
      .get<any>(CommonService.IssuesPath)
      .toPromise()
      .then((resonse: Response) => {
        return resonse['issues'];
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getIssuesObservable(): Observable<Issue[]> {
    return this.http
      .get(CommonService.IssuesPath)
      .pipe(map((data: any) => data.issues));
    // return this.http.get<Issue[]>(CommonService.IssuesPath);
    //  .pipe(catchError(this.handleHttpError));
  }
  async getRecentlyOpened(): Promise<any> {
    return await this.getIssuesPromise()
      .then((res) => {
        return res.filter(
          (i) => i.status !== Status.Closed.toString() && !i.closure_date
        );
      })
      .then((res) => {
        // console.log('getRecentlyOpened', res);
        return res.sort((a, b) => {
          return (
            Date.parse(b.reported_at).valueOf() -
            Date.parse(a.reported_at).valueOf()
          );
        });
      })
      .then((res) => {
        return res.slice(0, 5);
      });
  }
  async getRecentlyClosed() {
    return await this.getIssuesPromise()
      .then((res) => {
        return res.filter((i) => i.status === Status.Closed.toString());
      })
      .then((res) => {
        //  console.log('getRecentlyClosed', res);
        return res.sort((a, b) => {
          return (
            Date.parse(b.closure_date).valueOf() -
            Date.parse(a.closure_date).valueOf()
          );
        });
      })
      .then((res) => {
        return res.slice(0, 5);
      });
  }
  async getIssuesByAssignedUser(username): Promise<any> {
    return await this.getIssuesPromise()
      .then((res) => {
        return res.filter((i) => i.pending_with?.find((e) => e === username));
      })
      .then((res) => {
        // console.log('getRecentlyOpened', res);
        return res.sort((a, b) => {
          return (
            Date.parse(b.reported_at).valueOf() -
            Date.parse(a.reported_at).valueOf()
          );
        });
      })
      .then((res) => {
        return res.slice(0, 5);
      });
  }
  handleHttpError(err: HttpErrorResponse) {
    return throwError(err.message);
  }
  createIssue(issue: Issue): Promise<any> {
    return this.http.post<Issue>(CommonService.IssuesPath, issue).toPromise();
  }

  updateIssue(issue: Issue): Promise<any> {
    return this.http.put<Issue>(CommonService.IssuesPath, issue).toPromise();
  }
  private _myTasks = new BehaviorSubject<Issue[]>([]);
  fetchMyTasks() {
    // For now, fetch all the task for the userId 0
    // TODO: change API later
    return this.http
      .get<{ [key: string]: Issue }>(CommonService.IssuesPath)
      .pipe(
        map((resData) => {
          const tasks = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              tasks.push(
                new Issue(
                  resData[key].id,
                  resData[key].title,
                  resData[key].description,
                  resData[key].reported_at,
                  resData[key].reported_by,
                  resData[key].criticality,
                  resData[key].verified_by,
                  resData[key].target_date,
                  resData[key].closure_date,
                  resData[key].status,
                  resData[key].pending_with,
                  resData[key].system
                )
              );
            }
          }

          return tasks;
        }),
        tap((tasks) => {
          this._myTasks.next(tasks);
        })
      );
  }
}
