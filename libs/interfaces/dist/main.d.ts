interface ISession {
    sessionId: string;
    accessToken: string;
    refreshToken: string;
    userId: string;
}

interface IUser {
    userId?: string;
    email: string;
    passwordHash: string;
}

interface IUserInToken {
    userId: string;
}

interface ITokens {
    accessToken: string;
    refreshToken: string;
}

interface IsOk {
    isOk: boolean;
}

declare type ILogout = IsOk;

declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export { ILogout, ISession, ITokens, IUser, IUserInToken, IsOk, PartialBy };
