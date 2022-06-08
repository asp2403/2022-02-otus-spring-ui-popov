export interface Role {
    authority: string;
}

export interface UserDetails {
    username: string;
    fullName: string;
    roles: Role[];
    token: string | null;
}

export interface User {
    username: string;
    password: string;
}

export const ANONYMOUS_USER = {
    username: "AnonymousUser", 
    fullName: "AnonymousUser", 
    roles: [{authority: "ROLE_ANONYMOUS"}], 
    token: null
}