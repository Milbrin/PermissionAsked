import { expect } from 'chai';
import userConfirmMail from '../UseCases/userConfirmMail';
import { expectThrowsAsync } from './utils';
import { createUserRepositoryMemory } from '../InterfaceRepositories/User/UserRepositoryStub';

describe('A user confirm his mail address', async () => {
  it("return saved User when he's found and validated is passed to true", async () => {
    const bdd = [{
      id: '1',
      mail: 'favouille@gmail.com',
      validated: false,
      privileges: {
        canInviteUser: true,
        canCreateFamilyMember: true,
      },
      myFamilyMemberId: undefined,
    }];
    const mail = 'favouille@gmail.com';

    const UserRepositoryMemory = createUserRepositoryMemory(bdd);
    const userValidated = await userConfirmMail(
      mail,
      UserRepositoryMemory,
    );

    expect(userValidated.mail).to.be.equal(mail);
  });

  it("throw Error when it's receiving inexistant mail", async () => {
    const bdd = [{
      id: '1',
      mail: 'favouille@gmail.com',
      validated: false,
      privileges: {
        canInviteUser: true,
        canCreateFamilyMember: true,
      },
      myFamilyMemberId: undefined,
    }];
    const mail = 'failingMail';

    const UserRepositoryMemory = createUserRepositoryMemory(bdd);

    const mailValidation = userConfirmMail(
      mail,
      UserRepositoryMemory,
    );

    await expectThrowsAsync(() => mailValidation, 'user not found');
  });
});
