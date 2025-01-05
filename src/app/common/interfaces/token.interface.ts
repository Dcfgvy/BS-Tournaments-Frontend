export interface IToken {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  expiresAt?: number; // timestamp
  refreshToken: string;
}