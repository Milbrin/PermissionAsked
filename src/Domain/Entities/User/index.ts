import Schema, {
  boolean, string, Type,
} from 'computed-types';
import validator from 'validator';

const atLeastUppercase = (passwordTested : string) : boolean => /^(?=.*[A-Z])[a-zA-Z\d]/.test(passwordTested);
const atLeastNumber = (passwordTested : string) : boolean => /^(?=.*\d)[a-zA-Z\d]/.test(passwordTested);

const strongPassword = (passwordTested : string) : string => {
  const errors = [];
  if (!atLeastUppercase(passwordTested)) {
    errors.push(new TypeError('At least one uppercase'));
  }
  if (!atLeastNumber(passwordTested)) {
    errors.push(new TypeError('At least one number'));
  }
  if (passwordTested.length < 8 || passwordTested.length > 64) {
    errors.push(new TypeError('Must be between 8 and 64 characters'));
  }
  if (errors.length > 0) {
    throw errors;
  }
  return passwordTested;
};

const UserSchema = Schema({
  id: string,
  mail: string.test(validator.isEmail, 'Not an email'),
  password: string.test(strongPassword),
  privileges: {
    canInviteUser: boolean,
    canCreateFamilyMember: boolean,
  },
  myFamilyMemberId: string.optional(), // family member id
});

const UserDTOSchema = Schema({
  id: string,
  mail: string.test(validator.isEmail, 'Not an email'),
  password: string.test(strongPassword),
  privileges: {
    canInviteUser: boolean,
    canCreateFamilyMember: boolean,
  },
  myFamilyMemberId: string.optional(),
});

export const UserValidator = UserSchema.destruct();
export type User = Type<typeof UserSchema>;
export type UserDTO = Type<typeof UserDTOSchema>;
