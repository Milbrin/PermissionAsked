import bcrypt from 'bcrypt';

export const createHashServiceBcrypt = () => ({
  hash: (password: string) => bcrypt.hash(password, 8),
  compare: (password: string, encodedPassword: string) => bcrypt.compare(password, encodedPassword),
});

// const atLeastUppercase = (passwordTested : string) : boolean =>
// /^(?=.*[A-Z])[a-zA-Z\d]/.test(passwordTested);
// const atLeastNumber = (passwordTested : string) : boolean =>
// /^(?=.*\d)[a-zA-Z\d]/.test(passwordTested);

// const strongPassword = (passwordTested : string) : string => {
//   const errors = [];
//   if (!atLeastUppercase(passwordTested)) {
//     errors.push(new TypeError('At least one uppercase'));
//   }
//   if (!atLeastNumber(passwordTested)) {
//     errors.push(new TypeError('At least one number'));
//   }
//   if (passwordTested.length < 8 || passwordTested.length > 64) {
//     errors.push(new TypeError('Must be between 8 and 64 characters'));
//   }
//   if (errors.length > 0) {
//     throw errors;
//   }
//   return passwordTested;
// };
