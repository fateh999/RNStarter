import Axios, {AxiosRequestConfig} from 'axios';
import UltimateConfig from 'react-native-ultimate-config';
import {
  getAuthValue,
  resetAuthValue,
} from 'src/Modules/AuthModule/Hooks/useAuthValue';
import {PhoneNumberUtil} from 'google-libphonenumber';
import SnackbarHandler from './SnackbarHandler';

export const fetcher = async (config: AxiosRequestConfig) => {
  const {url, method, data, headers} = config;
  const {token} = getAuthValue();
  return await Axios.request({
    baseURL: UltimateConfig.API_URL,
    url,
    method: method ?? 'GET',
    data,
    ...config,
    headers: {
      Authorization: `Bearer ${token}`,
      ...config?.headers,
      ...headers,
    },
  });
};

export const onError = (error: any) => {
  if (error?.response) {
    console.log({error: error?.response?.data});
    if (error?.response?.data?.message) {
      SnackbarHandler.errorToast(error?.response?.data?.message);
    }
    if (error?.response?.status === 401) {
      resetAuthValue();
    }
  } else {
    console.log({error});
  }
};

export const getEmailValidationRules = (
  requiredMessage: string = 'Email is required',
  invalidMessage: string = 'Email is invalid',
) => {
  return {
    validate: (value: string) => (value.trim() ? true : requiredMessage),
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: invalidMessage,
    },
  };
};

export const getPasswordValidationRules = (
  requiredMessage: string = 'Password is required',
  minLengthMessage: string = 'Password must be atleast 8 characters',
  maxLengthMessage: string = 'Password should not be more than 20 characters',
) => {
  return {
    validate: (value: string) => (value.trim() ? true : requiredMessage),
    minLength: {
      value: 8,
      message: minLengthMessage,
    },
    maxLength: {
      value: 20,
      message: maxLengthMessage,
    },
  };
};

export const getRequiredRules = (label: string, requiredMessage?: string) => {
  return {
    validate: (value: string) =>
      value.trim()
        ? true
        : requiredMessage
        ? requiredMessage
        : `${label} is required`,
  };
};

const phoneUtil = PhoneNumberUtil.getInstance();

export const isValidNumber = (phoneNumber: string) => {
  try {
    if (phoneNumber.indexOf('.') !== -1) {
      return false;
    }
    const phone = phoneUtil.parse(phoneNumber);
    return phoneUtil.isValidNumber(phone);
  } catch (error) {
    return false;
  }
};

export const getNumberData = (phoneNumber: string) => {
  try {
    if (phoneNumber.indexOf('.') !== -1) {
      return false;
    }
    const phone = phoneUtil.parse(phoneNumber);
    return phone;
  } catch (error) {
    return undefined;
  }
};

export const getPhoneNumberValidationRules = (countryCode: string) => {
  return {
    validate: (value: string) =>
      value.trim()
        ? isValidNumber(`${countryCode ? '+' : ''}${countryCode}${value}`)
          ? true
          : 'Phone number is invalid'
        : 'Phone number is required',
  };
};
