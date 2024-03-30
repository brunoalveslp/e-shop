import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private _breadcrumbs$ = new BehaviorSubject<Array<any>>([]);
  public breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs = this.getBreadcrumbs(root);
      this._breadcrumbs$.next(breadcrumbs);
    });
  }

  updateDescription(description: string) {
    const breadcrumbs = this._breadcrumbs$.value;
    if (breadcrumbs.length > 0) {
      // Update the description of the last breadcrumb
      breadcrumbs[breadcrumbs.length - 1].description = description || breadcrumbs[breadcrumbs.length - 1].breadcrumb;
      this._breadcrumbs$.next(breadcrumbs);
    }
  }

  getBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Array<any> = []): Array<any> {
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';
    let path = route.routeConfig && route.routeConfig.path ? route.routeConfig.path : '';

    // If the label is ':id', replace it with the actual id from the route parameters
    if (label === ':id') {
      label = route.params['id'];
    }

    let nextUrl = `${url}${path}/`;
    let breadcrumb = {
      url: nextUrl,
      breadcrumb: label,
      description: label === ':id' ? '' : label  // Set the description as the label by default unless the label is ':id'
    };

    let newBreadcrumbs = breadcrumb['breadcrumb'] ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];

    if (route.firstChild) {
      return this.getBreadcrumbs(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
