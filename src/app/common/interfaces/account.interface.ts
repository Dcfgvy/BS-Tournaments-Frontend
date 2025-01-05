import { UserRole } from "../enums/user-role.enum";

export interface IAccount {
  id: number;
  tag: string;
  name: string;
  balance: number;
  language: string;
  roles: UserRole[];
  bannedUntil: string;
}