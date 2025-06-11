export interface IUser {
    _id: string;
    username: string;
  }
  
  export interface IMessage {
    _id: string;
    sender: string | IUser;
    receiver?: string;
    group?: string;
    content: string;
    createdAt: string;
    tempId?: string;
    readBy: string[];
  }
  
  export interface IGroup {
    _id: string;
    name: string;
    members: IUser[];
    createdAt: string;
  }