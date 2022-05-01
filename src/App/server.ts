import { makeAuthentification } from '../Domain/Entities/Authentification';

const user = makeAuthentification({ password: 'Example1', mail: 'example@gmail.com' });
console.log(user);
