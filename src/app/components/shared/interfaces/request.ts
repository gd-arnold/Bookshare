import { IUser } from './user';
import { IBook } from './book';
import { IDeliveryInfo } from './delivery-info';

export interface IRequest {
    id: number;
    isAccepted: boolean;
    isReadByRequester: boolean;
    isReadByReceiver: boolean;
    requester: IUser;
    receiver: IUser;
    requestedBook: IBook;
    chosenBook: IBook;
    requesterAddress: IDeliveryInfo;
    receiverAddress: IDeliveryInfo;
}