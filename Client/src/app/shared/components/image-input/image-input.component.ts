import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ImageInputComponent implements OnInit, OnChanges {
  @Output() newImageEvent = new EventEmitter<File>();
  @Output() removeImageEvent = new EventEmitter<void>();
  @Input() url: string | null = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (!this.url) {
      this.url = '../../../../assets/images/image-placeholder.jpg';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['url'] && changes['url'].currentValue !== changes['url'].previousValue) {
      this.url = changes['url'].currentValue;
    }
  }

  onFileSelected(files: FileList | null): void {
    if (files) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event: Event) => {
        const fileReader = event.target as FileReader;
        this.url = fileReader.result as string;
      };
      this.newImageEvent.emit(files[0]);
    }
  }

  resetImage(): void {
    this.url = '../../../../assets/images/image-placeholder.jpg';
    this.removeImageEvent.emit();
  }

  private fetchImage(url: string): Observable<File> {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map(blob => {
        const type = blob.type;
        const name = url.split('/').pop() || `image.${type.split('/')[1]}`;
        return new File([blob], name, { type });
      })
    );
  }
}
