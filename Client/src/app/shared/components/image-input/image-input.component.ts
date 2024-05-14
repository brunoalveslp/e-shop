import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ImageInputComponent implements OnInit {
  @Output() newImageEvent: EventEmitter<any> = new EventEmitter();
  @Output() removeImageEvent: EventEmitter<any> = new EventEmitter();
  @Input() url: string | null | undefined = '';

  constructor(){
  }

  ngOnInit(): void {
    if(this.url == ''){
      this.url = '../../../../assets/images/image-placeholder.jpg'
    }
  }

  onFileSelected(files: FileList | null) {
    if (files) {
        var reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (event:Event) => {
          let fileReader = event.target as FileReader
          this.url = fileReader.result as string;
        }
      }
      if(files){
        this.newImageEvent.emit(files[0] as File);
      }
    }

    resetImage(){
      this.url = '../../../../assets/images/image-placeholder.jpg';
      this.removeImageEvent.emit();
    }

}
