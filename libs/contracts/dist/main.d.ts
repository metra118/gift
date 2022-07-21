import { IUserInToken } from '@gift/interfaces';

declare enum ResponceStatuses {
    error = "error",
    success = "success"
}

declare class ResponseError {
    status: ResponceStatuses;
    error: {
        statusCode: number;
        message: string;
        errors: string[];
    };
}

declare class ResponseSuccess {
    status: ResponceStatuses;
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
    data: {
        accessToken: string;
        refreshToken: string;
    };
}
declare type AccountRegisterResponse = AccountRegisterResponseSuccess | ResponseError;

declare const accountLoginKey = "account.login.command";
declare class AccountLoginRequest {
    email: string;
    password: string;
}
declare class AccountLoginResponseSuccess extends ResponseSuccess {
    data: {
        accessToken: string;
        refreshToken: string;
    };
}
declare type AccountLoginResponse = AccountLoginResponseSuccess | ResponseError;

declare const accountLogoutKey = "account.logout.command";
declare class AccountLogoutRequest {
    refreshToken: string;
}
declare class AccountLogoutResponseSuccess extends ResponseSuccess {
    data: {
        ok: boolean;
    };
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
    data: {
        accessToken: string;
        refreshToken: string;
    };
}
declare type AccountRefreshResponse = AccountRefreshResponseSuccess | ResponseError;

export { AccountGetUserRequest, AccountGetUserResponse, AccountLoginRequest, AccountLoginResponse, AccountLogoutRequest, AccountLogoutResponse, AccountRefreshRequest, AccountRefreshResponse, AccountRegisterRequest, AccountRegisterResponse, ResponceStatuses, ResponseError, ResponseSuccess, UserInToken, accountGetUserTopic, accountLoginKey, accountLogoutKey, accountRefreshKey, accountRegisterKey };
