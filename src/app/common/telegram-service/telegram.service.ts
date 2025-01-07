import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  // private window;
  // private tg;
  constructor(
    @Inject(DOCUMENT) private readonly _document: any
  ) {
    // this.window = this._document.defaultView;
    // this.tg = this.window.Telegram.WebApp;
  }
}
