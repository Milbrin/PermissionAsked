import { ValidationError } from 'computed-types';
import cuid from 'cuid';
import { User, UserDTO, UserValidator } from './index';

export const createUser = async (userProps : any) : Promise<User> => {
  const id = cuid();

  const [errors, user] = UserValidator({
    ...userProps,
    id,
  });

  if (errors || !user) {
    throw errors;
  }

  return Object.freeze(user);
};

export const transformUserToDTO = (user: User) : UserDTO => {
  const userDTO = {
    id: user.id,
    mail: user.mail,
    validated: user.validated,
    privileges: user.privileges,
    myFamilyMemberId: user.myFamilyMemberId,
  };
  return userDTO;
};
