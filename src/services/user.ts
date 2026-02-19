import { UserData } from "../mock";

import { User } from '../types';

type userToken = string;

export function getUserData(userToken: userToken): Promise<User> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			userToken ? resolve(UserData) : reject('Token inválido');
    }, 1500);
	})
}

export function getToken(): Promise<userToken>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('token');
    }, 500);
  });
};