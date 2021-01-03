import ILocation from "./ILocation";

export default interface IMessage {
    id: number,
    userId: number,
    body: string,
    location: ILocation,
    userName: string
} 