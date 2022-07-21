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

interface ILogout {
    isOk: boolean;
}

declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export { ILogout, ISession, ITokens, IUser, IUserInToken, PartialBy };
