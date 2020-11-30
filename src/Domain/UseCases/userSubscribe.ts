import * as UserService from '../Entities/User/service';
import { IUserRepository } from '../InterfaceRepositories/User';
import { createHashServiceBcrypt } from '../InterfaceServices/User/HashServiceStrub';
import { User } from '../Entities/User';

export default async (userData : any, userRepository: IUserRepository) : Promise<User> => {
  const hashServiceBcrypt = createHashServiceBcrypt();
  const user = await UserService.createUser(userData, hashServiceBcrypt);
  const savedUser = userRepository.save(user);

  return savedUser;
};
