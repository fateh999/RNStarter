import {BehaviorSubject} from 'rxjs';
import PersistStorage from 'src/Utils/PersistStorage';
import {AUTH_STATE} from '../Types/CommonTypes';

export const initialAuthState: AUTH_STATE = {
  loggedIn: false,
  user: undefined,
  token: '',
};

const authState$ = new BehaviorSubject<AUTH_STATE>(initialAuthState);
const persistStorage = new PersistStorage('authState', authState$);
persistStorage.init();

export default authState$;
