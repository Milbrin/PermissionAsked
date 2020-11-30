import { expect } from 'chai';
import userSubscribe from '../UseCases/userSubscribe';
import { createUserRepositoryMemory } from '../InterfaceRepositories/User/UserRepositoryStub';

describe('A user subscribe', async () => {
  it("return saved User when it's receiving correct data", async () => {
    const userData = {
      mail: 'favouille@gmail.com',
      password: 'Password1',
      privileges: {
        canInviteUser: true,
        canCreateFamilyMember: true,
      },
    };
    const UserRepositoryMemory = createUserRepositoryMemory();
    const userFromBDD = await userSubscribe(userData, UserRepositoryMemory);

    expect(userFromBDD.mail).to.be.equal(userData.mail);
  });

  it("return ValidationError when it's receiving bad data", async () => {
    const userData = {
      mail: 'failingString',
      password: 'Password1',
      privileges: {
        canInviteUser: true,
        canCreateFamilyMember: true,
      },
    };
    const UserRepositoryMemory = createUserRepositoryMemory();

    const subscription = userSubscribe(userData, UserRepositoryMemory);
    expect(() => subscription, 'mail: Not an email').to.throw;
  });
});
