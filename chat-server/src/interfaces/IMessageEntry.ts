import IPosition from "./IPosition";

export default interface IMessageEntry {
    body: string,
    position: IPosition,
    userName: string
} 