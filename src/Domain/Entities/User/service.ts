import cuid from 'cuid';
import { IHashService } from '../../InterfaceServices/User/IHashService';
import { User, UserDTO, UserValidator } from './index';

export const createUser = async (userProps : any, hashService: IHashService) : Promise<User> => {
  const id = cuid();

  const [errors, user] = UserValidator({
    ...userProps,
    id,
  });

  if (errors || !user) {
    throw errors;
  }
  const encodedPassword = await hashService.hash(user.password);
  user.password = encodedPassword;
  return Object.freeze(user);
};

export const transformUserToDTO = (user: User) : UserDTO => {
  const userDTO = {
    id: user.id,
    mail: user.mail,
    password: user.password,
    privileges: user.privileges,
    myFamilyMemberId: user.myFamilyMemberId,
  };
  return userDTO;
};
