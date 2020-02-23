import { IUser } from './user';
import { IBook } from './book';

export interface IRequest {
    id: number;
    isAccepted: boolean;
    isReadByRequester: boolean;
    isReadByReceiver: boolean;
    requester: IUser;
    receiver: IUser;
    requestedBook: IBook;
    chosenBook: IBook;
}