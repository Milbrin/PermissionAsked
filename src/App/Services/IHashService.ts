export interface IHashService {
  hash(password: string) : Promise<string>
  compare(password : string, encodedPassword: string) : Promise<boolean>
}
