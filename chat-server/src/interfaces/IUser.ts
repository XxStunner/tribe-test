import ILocation from "./ILocation";
import IMessage from "./Imessage";

export default interface IUser {
    id?: number,
    name: string,
    location: ILocation,
    message: IMessage
}