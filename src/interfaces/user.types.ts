export type ProfileStateType = {
  access_token?: string,
  token_type?: string,
  expires_in?: number,
  user?: User,
};

export interface User {
  id: number;
  username: string;
  email: string;
  register_ip: string;
  last_login: Date;
  remember_token?: any;
  created_at: Date;
  updated_at: Date;
}
