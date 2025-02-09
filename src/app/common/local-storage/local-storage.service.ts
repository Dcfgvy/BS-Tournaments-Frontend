import { Injectable } from '@angular/core';
import { IAccount } from '../interfaces/account.interface';
import { IToken } from '../interfaces/token.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  // Set a value in local storage
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Get a value from local storage
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Remove a value from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  clear(): void {
    localStorage.clear();
  }

  getMe(): IAccount {
    return JSON.parse(this.getItem('account') as string);
  }

  getToken(): IToken {
    return JSON.parse(this.getItem('token') as string);
  }
}