import { Component, Input } from '@angular/core';
import { ListOfLinks } from '../../models/listOfLinks';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  animations: [
    trigger('openClose', [
      state('in', style({
        overflow: 'hidden',
        height: '*',
        width: '100%'
      })),
      state('out', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px',
        width: '0px'
      })),
      transition('in => out', animate('400ms ease')),
      transition('out => in', animate('400ms ease'))
    ])
  ],
})
export class CardComponent {
  @Input() title: string;
  @Input() links: ListOfLinks[] = [];
  isOpen = true;

  // openAndClose(){
  //   this.isOpen = !this.isOpen;
  // }
}

