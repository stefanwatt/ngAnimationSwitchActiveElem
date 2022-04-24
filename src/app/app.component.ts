import { Component } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import {
  slideInUpOnEnterAnimation,
  slideOutDownOnLeaveAnimation,
} from 'angular-animations';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

const listAnimationEnter = trigger('listAnimationEnter', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ transform: 'translateY(100%)' }),
        animate('600ms ease-in', style({ transform: 'translateY(0%)' })),
      ],
      { optional: true }
    ),
  ]),
]);
const listAnimationLeave = trigger('listAnimationLeave', [
  transition('* <=> *', [
    query(
      ':leave',
      [
        style({ transform: 'translateY(0%)' }),
        animate('600ms ease-in', style({ transform: 'translateY(100%)' })),
      ],
      { optional: true }
    ),
  ]),
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideOutDownOnLeaveAnimation(),
    slideInUpOnEnterAnimation(),
    listAnimationEnter,
    listAnimationLeave,
  ],
})
export class AppComponent {
  title = 'animations';
  elems = [
    {
      id: 1,
      name: 'Squirtle',
      img: `https://img.pokemondb.net/sprites/silver/normal/squirtle.png`,
    },
    {
      id: 2,
      name: 'Bulbasaur',
      img: `https://img.pokemondb.net/sprites/silver/normal/bulbasaur.png`,
    },
    {
      id: 3,
      name: 'Charmander',
      img: `https://img.pokemondb.net/sprites/silver/normal/charmander.png`,
    },
  ];
  selectedElem = this.elems[0];
  nextElem = this.elems[0];
  message = '';

  onSelectedElemChange = (e: AnimationEvent) => {
    setTimeout(() => {
      this.message = `That's enough. Come Back ${this.selectedElem.name}!`;
      setTimeout(() => {
        this.message = `It's your turn now ${this.nextElem.name}`;
        setTimeout(() => {
          this.selectedElem = this.nextElem;
          this.message = '';
        }, 1000);
      }, 1000);
    }, 1000);
  };
}
