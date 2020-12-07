import { IUserRepository } from '../InterfaceRepositories/User';

import { User } from '../Entities/User';

export default async (
  mail: string,
  userRepository: IUserRepository,
)
  : Promise<User> => userRepository.getByMail(mail)
  .then((foundUser) => {
    const validatedUser = { ...foundUser, validated: true };
    return validatedUser;
  })
  .catch((error) => {
    throw error;
  });
