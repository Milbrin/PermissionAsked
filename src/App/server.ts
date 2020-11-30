import { makeAuthentification } from '../Domain/Entities/Authentification';

const user = makeAuthentification({ password: 'Karmapolic1', mail: 'favouille@gmail.com' });
console.log(user);
