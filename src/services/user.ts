import { UserData } from "../mock";

import { User } from '../types';

type userToken = string;

export function getUserData(userToken: userToken): Promise<User> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			userToken ? resolve(UserData) : reject('Token inválido');
    }, 500);
	})
}

export function getToken(): Promise<userToken>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('token');
    }, 500);
  });
};

interface EditFieldProps {
  id: number;
  field: string;
  value: string;
}

export function editField({ id, field, value }: EditFieldProps): Promise<{ data: String}>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'sucesso' });
    }, 1000);
  });
};

interface ChangePasswordProps {
  id: number;
  currentPassword: string;
  newPassword: string;
}

export function changePassword({ id, currentPassword, newPassword }: ChangePasswordProps): Promise<{ data: String}>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'sucesso' });
    }, 1000);
  });
};
