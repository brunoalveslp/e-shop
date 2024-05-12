import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
  @Output() pageChanged = new EventEmitter<number>();
  @Input() totalCount?: number;
  @Input() set pageSize(value: number | undefined) {
    if (value !== undefined && ![10, 25, 50, 100].includes(value)) {
      value = 10; // or some other default value
    }
    this._pageSize = value;
  }
  get pageSize(): number | undefined {
    return this._pageSize;
  }
  private _pageSize?: number;


  onPageChanged(event: any){
    this.pageChanged.emit(event.page);
  }
}
