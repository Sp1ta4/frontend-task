export interface INote{
    name: string,
    surname: string,
    age: string;
    email: string,
    message: string,
    number?: string
}
export interface INoteApi extends INote {
    id: string
}
export interface IApiResponse{
    success: boolean,
    notes: INoteApi[]
}