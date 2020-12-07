import { expect } from 'chai';
import userSubscribe from '../UseCases/userSubscribe';
import { createUserRepositoryMemory } from '../InterfaceRepositories/User/UserRepositoryStub';
import { createMailServiceFake } from '../InterfaceServices/User/MailServiceStub';
import { expectThrowsAsync } from './utils';

describe('A user subscribe', async () => {
  it("return saved User when it's receiving correct data", async () => {
    const userData = {
      mail: 'favouille@gmail.com',
      validated: false,
      privileges: {
        canInviteUser: true,
        canCreateFamilyMember: true,
      },
    };
    const mailData = {
      from: 'permission-asked@toreplace.fr',
      to: userData.mail,
      text: 'Hello',
    };

    const UserRepositoryMemory = createUserRepositoryMemory();
    const MailServiceFake = createMailServiceFake();
    const userFromBDD = await userSubscribe(
      userData,
      UserRepositoryMemory,
      MailServiceFake,
      mailData,
    );

    expect(userFromBDD.mail).to.be.equal(userData.mail);
  });

  it("throw ValidationError when it's receiving bad data", async () => {
    const userData = {
      mail: 'failingString',
      validated: false,
      privileges: {
        canInviteUser: true,
        canCreateFamilyMember: true,
      },
    };
    const mailData = {
      from: 'permission-asked@toreplace.fr',
      to: userData.mail,
      text: 'Hello',
    };
    const UserRepositoryMemory = createUserRepositoryMemory();
    const MailServiceFake = createMailServiceFake();
    const subscription = userSubscribe(
      userData,
      UserRepositoryMemory,
      MailServiceFake,
      mailData,
    );
    await expectThrowsAsync(() => subscription, 'mail: Not an email');
  });
});
