import {BehaviorSubject} from 'rxjs';
import {AUTH_STATE} from '../Types/CommonTypes';
import PersistStorage from 'src/Utils/PersistStorage';
import {fetcher} from 'src/Utils/Helpers';
import {LOGIN_REQUEST, REGISTER_REQUEST} from '../Types/RequestTypes';
import {LOGIN_RESPONSE, REGISTER_RESPONSE} from '../Types/ResponseTypes';
import {AxiosResponse} from 'axios';

class AuthService {
  queryKeys = {};
  authState$;
  initialAuthState = {
    loggedIn: false,
    user: undefined,
    token: '',
  };

  constructor() {
    this.authState$ = new BehaviorSubject<AUTH_STATE>(this.initialAuthState);
    const persistStorage = new PersistStorage('authState', this.authState$);
    persistStorage.init();
  }

  login = async (
    data: LOGIN_REQUEST,
  ): Promise<AxiosResponse<LOGIN_RESPONSE>> => {
    return fetcher({
      url: '/auth/login',
      method: 'POST',
      data,
    });
  };

  register = async (
    data: REGISTER_REQUEST,
  ): Promise<AxiosResponse<REGISTER_RESPONSE>> => {
    return fetcher({
      url: '/auth/register',
      method: 'POST',
      data,
    });
  };

  resetAuthValue = () => {
    this.authState$.next(this.initialAuthState);
  };
}

export default new AuthService();
