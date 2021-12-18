import {USER} from './ResponseTypes';

export type AUTH_STATE = {
  loggedIn: boolean;
  user: USER | undefined;
  token: string;
};
