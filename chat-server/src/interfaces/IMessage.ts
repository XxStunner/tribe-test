import ILocation from "./ILocation";

export default interface IMessage {
    id: number,
    body: string,
    location: ILocation,
    userName: string
} 