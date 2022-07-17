export declare const accountLoginTopic = "account.login.command";
export declare class AccountLoginRequest {
    email: string;
    password: string;
}
export declare class AccountLoginResponse {
    accessToken: string;
    refreshToken: string;
}
