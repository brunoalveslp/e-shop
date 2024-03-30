import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  breadcrumbs$ = this.bcService.breadcrumbs$;
  breadcrumbSubscription: Subscription;

  constructor(private bcService: BreadcrumbService) {}

  ngOnInit() {
    this.breadcrumbSubscription = this.breadcrumbs$.subscribe();
  }

  ngOnDestroy() {
    this.breadcrumbSubscription.unsubscribe();
  }
}
