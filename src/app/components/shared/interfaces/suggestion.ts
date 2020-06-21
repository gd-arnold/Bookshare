import { IUser } from './user';

export interface IBookSuggestion {
    id: string;
    bookTitle: string;
    bookAuthor: string;
    proposer: IUser;
}