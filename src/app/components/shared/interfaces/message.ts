import { IUser } from './user';

export interface IMessage {
    id: string;
    description: string;
    sender: IUser;
}