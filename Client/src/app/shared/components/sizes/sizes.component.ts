import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Size } from '../../models/size';
import { ProductSize } from '../../models/productSize';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrl: './sizes.component.scss'
})
export class SizesComponent implements OnInit {
  @Output() productSize: EventEmitter<any> = new EventEmitter();
  @Input() sizes: Size[] = [];
  @Input() productSizes: ProductSize[] = []
  @ViewChild('sizesSelect', {static: false}) sizesSelect?: ElementRef;

  selectedSizeId: string;
  quantity: number;
  isChecked: boolean = true;

  ngOnInit(): void {
    this.sizes = this.sizes.filter(s => s.isActive);

    this.productSizes.forEach(ps => {
      let size = this.sizes.find(s => s.id == ps.sizeId);
      if(size){
        ps.size = size;
      }
    });
  }


  addSize(){
    let size = this.sizes.find(s => s.id.toString() == this.sizesSelect?.nativeElement.value.toString());

    if(size && size.id != 0 && !this.productSizes.some(obj => obj.sizeId == size?.id)){
      this.productSizes.push(
        {
          sizeId: size?.id,
          size: size,
          quantity: 0,
          isActive: this.isChecked
        }
        )
      }
  }

  save(){
    const ps = this.productSizes
    this.productSize.emit(ps);
  }
}
