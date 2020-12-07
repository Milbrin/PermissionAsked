import { IUserRepository } from './index';
import { User } from '../../Entities/User';

export const createUserRepositoryMemory = (BDDInMemory : Array<User> = []) : IUserRepository => ({
  save: (user) => {
    BDDInMemory.push(user);
    return new Promise((resolve) => resolve(user));
  },
  exists: (id) => {
    const isExisting = BDDInMemory.some((userItem) => userItem.id === id);
    return new Promise((resolve) => resolve(isExisting));
  },
  getById: (id) => new Promise(
    (resolve, reject) => {
      const userFound = BDDInMemory.find((userItem) => userItem.id === id);
      if (userFound) resolve(userFound);
      else reject(new Error('user not found'));
    },
  ),
  getByMail: (mail) => new Promise(
    (resolve, reject) => {
      const userFound = BDDInMemory.find((userItem) => userItem.mail === mail);
      if (userFound) resolve(userFound);
      else reject(new Error('user not found'));
    },
  ),
});
