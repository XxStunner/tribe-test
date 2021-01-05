import IMessage from "./IMessage";

export default interface IUser {
    id?: number,
    name: string,
    position: {
        left: number,
        top: number
    },
    message: IMessage
}