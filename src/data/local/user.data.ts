import { ProfileStateType } from 'src/interfaces/user.types';

export const PERFIL: ProfileStateType = {
  access_token: 'ABCZXY123',
  expires_in: Date.now(),
  token_type: 'STATIC',
  user: {
    email: 'email',
    username: 'email',
    created_at: new Date(),
    id: 1,
    last_login: new Date(),
    register_ip: '127.0.0.1',
    updated_at: new Date(),
    remember_token: '',
  },
};
