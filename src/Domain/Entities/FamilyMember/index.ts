import cuid from 'cuid';
import Schema, { string, Type } from 'computed-types';
import validator from 'validator';

export const FamilyMemberSchema = Schema({
  id: string,
  role: Schema.either('parent' as const, 'enfant' as const),
  name: string.trim().normalize().between(1, 64),
  mail: string.test(validator.isEmail, 'Not an email'),
});

const FamilyMemberPropsSchema = Schema({
  role: Schema.either('parent' as const, 'enfant' as const),
  name: string.trim().normalize().between(1, 64),
  mail: string.test(validator.isEmail, 'Not an email'),
});

export type FamilyMember = Type<typeof FamilyMemberSchema>;
export type FamilyMemberProps = Type<typeof FamilyMemberPropsSchema>;

export const createFamilyMember = (familyMemberProps : FamilyMemberProps) : FamilyMember => {
  const id = cuid();
  const familyMember = FamilyMemberSchema({
    id,
    ...familyMemberProps,
  });

  return Object.freeze(familyMember);
};
