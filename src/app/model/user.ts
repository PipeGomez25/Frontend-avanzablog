export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    confirm_password?: string;
    team?: number;
  }