export type dataMail = {
  from: string,
  to: string,
  text?: string,
  html?: string
}

export interface IMailService {
  send(data: dataMail) : Promise<object>
}
