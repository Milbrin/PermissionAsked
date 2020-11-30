import { User } from '../../Entities/User';

export interface IUserRepository {
  save(user: User) : Promise<User>
  exists(id : string) : Promise<boolean>
  getById(id: string) : Promise<User>
}
