export interface IEmail {
    value: string;
    type?: 'personal' | 'work' | 'other';
}

export interface IPhoto {
    value: string;
}

export interface IUserCore {
    id: number;
    password: string;
}

export interface IUserLocal extends IUserCore {
    username: string;
}

export interface IUserProvider extends IUserCore {
    provider: string;
    displayName: string;
    name: {
        familyName: string;
        givenName: string;
        middleName: string;
    };
    emails: IEmail[];
    photos: IPhoto[];
}

export type TUser = IUserLocal | IUserProvider;