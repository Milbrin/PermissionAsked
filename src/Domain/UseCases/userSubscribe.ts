import * as UserService from '../Entities/User/service';
import { IUserRepository } from '../InterfaceRepositories/User';
import { IMailService, dataMail } from '../InterfaceServices/User/IMailService';

import { User } from '../Entities/User';

export default async (
  userData : any,
  userRepository: IUserRepository,
  mailService: IMailService,
  mailData: dataMail,
)
  : Promise<User> => {
  const user = await UserService.createUser(userData);
  const savedUser = userRepository.save(user);

  await mailService.send(mailData);

  return savedUser;
};
