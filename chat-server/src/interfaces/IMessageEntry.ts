import ILocation from "./ILocation";

export default interface IMessageEntry {
    body: string,
    location: ILocation,
    userName: string
} 