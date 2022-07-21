import { ITokens, ILogout, IUserInToken } from '@gift/interfaces';

declare enum ResponseStatuses {
    error = "error",
    success = "success"
}

declare class ResponseError {
    status: ResponseStatuses;
    error: {
        statusCode: number;
        message: string | string[];
        error: string;
    };
}

declare class ResponseSuccess {
    status: ResponseStatuses;
}

declare const accountGetUserTopic = "account.get-user.query";
declare class AccountGetUserRequest {
    userId: number;
}
declare class AccountGetUserResponseSuccess extends ResponseSuccess {
    data: {
        name: string;
    };
}
declare type AccountGetUserResponse = AccountGetUserResponseSuccess | ResponseError;

declare const accountRegisterKey = "account.register.command";
declare class AccountRegisterRequest {
    email: string;
    password: string;
}
declare class AccountRegisterResponseSuccess extends ResponseSuccess {
    data: ITokens;
}
declare type AccountRegisterResponse = AccountRegisterResponseSuccess | ResponseError;

declare const accountLoginKey = "account.login.command";
declare class AccountLoginRequest {
    email: string;
    password: string;
}
declare class AccountLoginResponseSuccess extends ResponseSuccess {
    data: ITokens;
}
declare type AccountLoginResponse = AccountLoginResponseSuccess | ResponseError;

declare const accountLogoutKey = "account.logout.command";
declare class AccountLogoutRequest {
    refreshToken: string;
}
declare class AccountLogoutResponseSuccess extends ResponseSuccess {
    data: ILogout;
}
declare type AccountLogoutResponse = AccountLogoutResponseSuccess | ResponseError;

declare const accountRefreshKey = "account.refresh.command";
declare class UserInToken implements IUserInToken {
    userId: string;
}
declare class AccountRefreshRequest {
    refreshToken: string;
    user: UserInToken;
}
declare class AccountRefreshResponseSuccess extends ResponseSuccess {
    data: ITokens;
}
declare type AccountRefreshResponse = AccountRefreshResponseSuccess | ResponseError;

declare const accountLogoutAllKey = "account.logouta-all.command";
declare class AccountLogoutAllRequest {
    userId: string;
}
declare class AccountLogoutAllResponseSuccess extends ResponseSuccess {
    data: ILogout;
}
declare type AccountLogoutAllResponse = AccountLogoutAllResponseSuccess | ResponseError;

export { AccountGetUserRequest, AccountGetUserResponse, AccountLoginRequest, AccountLoginResponse, AccountLogoutAllRequest, AccountLogoutAllResponse, AccountLogoutRequest, AccountLogoutResponse, AccountRefreshRequest, AccountRefreshResponse, AccountRegisterRequest, AccountRegisterResponse, ResponseError, ResponseStatuses, ResponseSuccess, UserInToken, accountGetUserTopic, accountLoginKey, accountLogoutAllKey, accountLogoutKey, accountRefreshKey, accountRegisterKey };
