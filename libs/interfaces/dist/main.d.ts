interface ISession {
    sessionId: string;
    accessToken: string;
    refreshToken: string;
    userId: string;
}

declare type ICreateSession = Pick<ISession, 'accessToken' | 'refreshToken' | 'userId'>;

interface IUser {
    userId: string;
    email: string;
    passwordHash: string;
    isActive: boolean;
    firstName: string | null;
    lastName: string | null;
    nickname: string | null;
    bio: string | null;
}

declare type ICreateUser = Pick<IUser, 'email' | 'passwordHash'>;

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

declare type IUserProfile = Omit<IUser, 'passwordHash'>;

interface IGift {
    giftId: string;
    userId: string;
    title: string;
    text: string;
}

declare type ICreateGift = Omit<IGift, 'giftId'>;

interface IGetGiftBy {
    giftId?: string;
    userId?: string;
}

interface IPagindation {
    skip?: number;
    take?: number;
}

declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export { ICreateGift, ICreateSession, ICreateUser, IGetGiftBy, IGift, ILogout, IPagindation, ISession, ITokens, IUser, IUserInToken, IUserProfile, IsOk, PartialBy };
