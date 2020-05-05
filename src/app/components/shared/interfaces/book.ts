export interface IBook {
    id: string;
    title: string;
    author: string;
    description: string;
    publisher: string;
    datePublished: string;
    pages: string;
    imageURL: string;
    users: [];
    requests: [];
}