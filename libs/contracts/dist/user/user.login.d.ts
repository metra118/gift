export declare const userLoginTopic = "user.login.command";
export declare class UserLoginRequest {
    email: string;
    password: string;
}
export declare class UserLoginResponse {
    accessToken: string;
    refreshToken: string;
}
