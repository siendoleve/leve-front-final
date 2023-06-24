export interface LoginResp {
  status: string;
  token: string;
  user: UserLogin;
}

export interface UserLogin {
  id: number;
  name: string;
  email: string;
  role: string;
}
