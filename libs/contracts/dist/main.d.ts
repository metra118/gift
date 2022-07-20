declare const accountGetUserTopic = 'account.get-user.query'
declare class AccountGetUserRequest {
  userId: number
}
declare class AccountGetUserResponse {
  name: string
}

declare const accountRegisterTopic = 'account.register.command'
declare class AccountRegisterRequest {
  email: string
  password: string
}
declare class AccountRegisterResponse {
  accessToken: string
  refreshToken: string
}

declare const accountLoginTopic = 'account.login.command'
declare class AccountLoginRequest {
  email: string
  password: string
}
declare class AccountLoginResponse {
  accessToken: string
  refreshToken: string
}

declare const accountLogoutTopic = 'account.logout.command'
declare class AccountLogoutRequest {
  refreshToken: string
}
declare class AccountLogoutResponse {
  ok: boolean
}

declare const accountRefreshTopic = 'account.refresh.command'
declare class AccountRefreshRequest {
  refreshToken: string
}
declare class AccountRefreshResponse {
  accessToken: string
  refreshToken: string
}

export {
  AccountGetUserRequest,
  AccountGetUserResponse,
  AccountLoginRequest,
  AccountLoginResponse,
  AccountLogoutRequest,
  AccountLogoutResponse,
  AccountRefreshRequest,
  AccountRefreshResponse,
  AccountRegisterRequest,
  AccountRegisterResponse,
  accountGetUserTopic,
  accountLoginTopic,
  accountLogoutTopic,
  accountRefreshTopic,
  accountRegisterTopic,
}
