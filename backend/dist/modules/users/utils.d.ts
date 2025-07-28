import { IUsersData } from './users.interface';
export declare const findUserByEmail: (db: Record<string, IUsersData>, email: string) => IUsersData | undefined;
