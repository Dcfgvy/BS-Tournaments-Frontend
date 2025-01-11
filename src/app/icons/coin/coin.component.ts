import { Component } from '@angular/core';

@Component({
  selector: 'app-coin',
  imports: [],
  template: `<img src="images/coin.png">`,
  styles: `
  img{
    height: 1.2rem;
    vertical-align: middle;
    margin-top: -0.2rem;
  }
  `
})
export class CoinComponent {

}
