import bcrypt from 'bcrypt';

export const createHashServiceBcrypt = () => ({
  hash: (password: string) => bcrypt.hash(password, 8),
  compare: (password: string, encodedPassword: string) => bcrypt.compare(password, encodedPassword),
});
