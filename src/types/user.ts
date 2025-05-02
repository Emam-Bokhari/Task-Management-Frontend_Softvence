

export interface IUser {
    name: string;
    email: string;
    role?: 'user' | 'admin';
    iat: string;
    exp: string;
}

