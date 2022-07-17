export declare const accountRegisterTopic = 'account.register.command'
export declare class AccountRegisterRequest {
  email: string
  password: string
}
export declare class AccountRegisterResponse {
  accessToken: string
  refreshToken: string
}
