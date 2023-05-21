import { IMessage } from "../../message/interface/IMessage.interface";
import { IUser } from "../../user/interface/IUser.interface";

export interface IChatRoom {
  readonly id: string;
  readonly host: Pick<IUser, "id" | "fullname" | "connection_id">;
  readonly title: string;
  readonly black_list_words: Array<string>;
  readonly connected: Array<Pick<IUser, "id" | "fullname" | "connection_id">>;
  readonly messages: Array<IMessage>;
  readonly ban_list: Array<string>;
}
