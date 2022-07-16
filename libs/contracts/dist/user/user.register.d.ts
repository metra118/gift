export declare const userRegisterTopic = "user.get-user.command";
export declare class UserRegisterRequest {
    email: string;
    password: string;
}
export declare class UserRegisterResponse {
    accessToken: string;
    refreshToken: string;
}
