import { Observable, Subject, concat, of } from 'rxjs';
import { distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';
import { ObservableState, recordState } from '../../helpers';

export class AutoCompleteOptions {
  constructor(onSearch: (term: string) => Observable<any[]>, selectedItems?: any[]) {
    this.onSearch = onSearch;
    this.selectedItems = selectedItems;
    this.configEquipmentObservable();
  }
  public SetDefaultItems(items: any[]): void {
    this.selectedItems = items;
    this.configEquipmentObservable();
  }
  public clearDefaultItems() {
    this.selectedItems = [];
    this.configEquipmentObservable();
  }
  items: Observable<any[]>;
  subject = new Subject<string>();
  state: ObservableState = new ObservableState();
  private onSearch: (term: string) => Observable<any[]>;
  private selectedItems: any[];
  private getDefaultItems(): Observable<any[]> {
    if (!this.selectedItems)
      return of([]);
    return of(this.selectedItems);
  }
  
  private configEquipmentObservable() {
    var defaultItems = this.getDefaultItems(); 
    
    this.items = concat(
      defaultItems, // default items
      this.subject.pipe(
        distinctUntilChanged(),
        tap(() => this.state.Start()),
        switchMap(term => {
          return this.onSearch( term )
            .pipe(
              recordState(this.state),
              catchError(() => of([])),
            )
        })
      )
    );
  }
}
