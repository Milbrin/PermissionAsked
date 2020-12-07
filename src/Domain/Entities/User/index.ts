/* eslint-disable max-len */
import Schema, {
  boolean, string, Type,
} from 'computed-types';
import validator from 'validator';

const UserSchema = Schema({
  id: string,
  mail: string.test(validator.isEmail, 'Not an email'),
  validated: boolean,
  privileges: {
    canInviteUser: boolean,
    canCreateFamilyMember: boolean,
  },
  myFamilyMemberId: string.optional(), // family member id
});

const UserDTOSchema = Schema({
  id: string,
  mail: string.test(validator.isEmail, 'Not an email'),
  validated: boolean,
  privileges: {
    canInviteUser: boolean,
    canCreateFamilyMember: boolean,
  },
  myFamilyMemberId: string.optional(),
});

export const UserValidator = UserSchema.destruct();
export type User = Type<typeof UserSchema>;
export type UserDTO = Type<typeof UserDTOSchema>;
