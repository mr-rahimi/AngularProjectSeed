import { Observable, from } from 'rxjs';
export enum ObservableHandlerResultStatus {
  Unknown = "unknown",
  Succeeded = "succeeded",
  Failed = "failed",
}
export enum ObservableHandlerCompleteStatus {
  Completed = "completed",
  Wait = "wait",
  Initial = "initial",
}
export const recordState = <T>(n: ObservableState) => (source: Observable<T>) =>
  new Observable<T>(observer => {
    return source.subscribe({
      next(x) {
        n.resultState = ObservableHandlerResultStatus.Succeeded;
        n.completionState = ObservableHandlerCompleteStatus.Completed;
        observer.next(x);
      },
      error(err) {
        n.resultState = ObservableHandlerResultStatus.Failed;
        n.completionState = ObservableHandlerCompleteStatus.Completed;
        observer.error(err);
      },
      complete() {
        n.completionState = ObservableHandlerCompleteStatus.Completed;
        observer.complete();
      }
    });
  });

export class ObservableState {
  resultState: ObservableHandlerResultStatus = ObservableHandlerResultStatus.Unknown;
  completionState: ObservableHandlerCompleteStatus = ObservableHandlerCompleteStatus.Initial;
  public constructor() {
  }

  get IsCompleted(): boolean {
    return this.completionState == ObservableHandlerCompleteStatus.Completed;
  }
  get IsWait(): boolean {
    return this.completionState == ObservableHandlerCompleteStatus.Wait;
  }
  get IsInitial(): boolean {
    return this.completionState == ObservableHandlerCompleteStatus.Initial;
  }

  get IsSucceeded(): boolean {
    return this.resultState == ObservableHandlerResultStatus.Succeeded;
  }
  get IsFailed(): boolean {
    return this.resultState == ObservableHandlerResultStatus.Failed;
  }
  Start() {
    this.completionState = ObservableHandlerCompleteStatus.Wait;
  }
  Wait(): void {
    this.Start();
  }
}
