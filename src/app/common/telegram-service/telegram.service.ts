import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TgWebApp } from '../interfaces/tg-web-app.interface';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private window;
  private tg: TgWebApp;

  constructor(
    @Inject(DOCUMENT) private readonly _document: any
  ) {
    this.window = this._document.defaultView;
    this.tg = this.window.Telegram?.WebApp;
  }

  get initData(){
    return this.tg?.initData;
  }
}
