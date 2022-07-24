import { IUserProfile, ITokens, ILogout, IUserInToken, IsOk, ICreateGift, IGift } from '@gift/interfaces';

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

declare const accountGetUserProfileKey = "account.get-user-profile.query";
declare class AccountGetUserProfileRequest {
    userId: string;
}
declare class AccountGetUserProfileResponseSuccess extends ResponseSuccess {
    payload: IUserProfile;
}
declare type AccountGetUserProfileResponse = AccountGetUserProfileResponseSuccess | ResponseError;

declare const accountUpdateUserProfileKey = "account.update-user-profile.command";
declare class AccountUpdateUserProfileRequest implements IUserProfile {
    userId: string;
    email: string;
    isActive: boolean;
    firstName: string | null;
    lastName: string | null;
    nickname: string | null;
    bio: string | null;
}
declare class AccountUpdateUserProfileResponseSuccess extends ResponseSuccess {
    payload: IUserProfile;
}
declare type AccountUpdateUserProfileResponse = AccountUpdateUserProfileResponseSuccess | ResponseError;

declare const accountRegisterKey = "account.register.command";
declare class AccountRegisterRequest {
    email: string;
    password: string;
}
declare class AccountRegisterResponseSuccess extends ResponseSuccess {
    payload: ITokens;
}
declare type AccountRegisterResponse = AccountRegisterResponseSuccess | ResponseError;

declare const accountLoginKey = "account.login.command";
declare class AccountLoginRequest {
    email: string;
    password: string;
}
declare class AccountLoginResponseSuccess extends ResponseSuccess {
    payload: ITokens;
}
declare type AccountLoginResponse = AccountLoginResponseSuccess | ResponseError;

declare const accountLogoutKey = "account.logout.command";
declare class AccountLogoutRequest {
    refreshToken: string;
}
declare class AccountLogoutResponseSuccess extends ResponseSuccess {
    payload: ILogout;
}
declare type AccountLogoutResponse = AccountLogoutResponseSuccess | ResponseError;

declare const accountRefreshKey = "account.refresh.command";
declare class UserInTokenDot implements IUserInToken {
    userId: string;
}
declare class AccountRefreshRequest {
    refreshToken: string;
    user: IUserInToken;
}
declare class AccountRefreshResponseSuccess extends ResponseSuccess {
    payload: ITokens;
}
declare type AccountRefreshResponse = AccountRefreshResponseSuccess | ResponseError;

declare const accountLogoutAllKey = "account.logouta-all.command";
declare class AccountLogoutAllRequest {
    userId: string;
}
declare class AccountLogoutAllResponseSuccess extends ResponseSuccess {
    payload: ILogout;
}
declare type AccountLogoutAllResponse = AccountLogoutAllResponseSuccess | ResponseError;

declare const accountRemoveDeadTokensKey = "account.remove-dead-tokens.command";
declare class AccountRemoveDeadTokensRequest {
}
declare class AccountRemoveDeadTokensResponseSuccess extends ResponseSuccess {
    payload: IsOk;
}
declare type AccountRemoveDeadTokensResponse = AccountRemoveDeadTokensResponseSuccess | ResponseError;

declare const giftCreateGiftKey = "gift.create-gift.command";
declare class GiftCreateGiftRequest implements ICreateGift {
    userId: string;
    title: string;
    text: string;
}
declare class GiftCreateGiftResponseSuccess extends ResponseSuccess {
    payload: IGift;
}
declare type GiftCreateGiftResponse = GiftCreateGiftResponseSuccess | ResponseError;

export { AccountGetUserProfileRequest, AccountGetUserProfileResponse, AccountLoginRequest, AccountLoginResponse, AccountLogoutAllRequest, AccountLogoutAllResponse, AccountLogoutRequest, AccountLogoutResponse, AccountRefreshRequest, AccountRefreshResponse, AccountRegisterRequest, AccountRegisterResponse, AccountRemoveDeadTokensRequest, AccountRemoveDeadTokensResponse, AccountUpdateUserProfileRequest, AccountUpdateUserProfileResponse, GiftCreateGiftRequest, GiftCreateGiftResponse, ResponseError, ResponseStatuses, ResponseSuccess, UserInTokenDot, accountGetUserProfileKey, accountLoginKey, accountLogoutAllKey, accountLogoutKey, accountRefreshKey, accountRegisterKey, accountRemoveDeadTokensKey, accountUpdateUserProfileKey, giftCreateGiftKey };
