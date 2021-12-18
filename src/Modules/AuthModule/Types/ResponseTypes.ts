export type USER = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type LOGIN_RESPONSE = {
  user: USER;
  jwt: string;
};

export type REGISTER_RESPONSE = {
  user: USER;
  jwt: string;
};
