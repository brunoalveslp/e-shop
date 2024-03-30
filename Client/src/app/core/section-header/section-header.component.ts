import { Component } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/components/breadcrumb.service';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent {
  constructor(public bcService: BreadcrumbService){}


}
